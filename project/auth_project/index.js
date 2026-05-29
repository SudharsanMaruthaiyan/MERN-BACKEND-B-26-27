const express = require("express");
const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
var jwt = require("jsonwebtoken");
var morgan = require("morgan");

const app = express();
const prisma = new PrismaClient();
app.use(express.json());
app.use(morgan("dev"));

const middleware1 = (req, res, next) => {
  console.log("middleware1");
  next();
};

const middleware2 = (req, res, next) => {
  console.log("middleware2");
  next();
};
// app.use(middleware1);
// app.use(middleware2);

const authMiddleware = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const ans = jwt.verify(token, "sd-rooms", function (err, decoded) {
      if (!err) {
        req.users = {
          role: decoded.role,
        };
        next();
      } else {
        res.status(401).send("Invalid Token");
      }
    });

    console.log(token, ans);
  } catch (error) {
    console.log(error);
  }
};

const RBAC = (ROLE) => {
  return (req, res, next) => {
    const { role } = req.users;

    if (role === ROLE) {
      next();
    } else {
      res.send("No Access for this role");
    }
  };
};

app.get("/", (req, res) => {
  res.send("Api is working...");
});

// POST => /register => Adding new users
app.post("/register", async (req, res) => {
  try {
    // 1, Data from front-end
    const data = req.body;
    // {
    //     "name": "",
    //     "email": "",
    //     "password": "",
    //     "phone_number": ""
    // }

    // 2, Db logic
    const isUserExists = await prisma.users.findUnique({
      where: {
        email: data.email,
      },
    });

    if (isUserExists) {
      res.status(401).json({ message: "user email already exists" });
    } else {
      const hashedPassword = await bcrypt.hash(data.password, 10);

      const newUser = await prisma.users.create({
        data: {
          name: data.name,
          email: data.email,
          password: hashedPassword,
          phone_number: data.phone_number,
        },
      });

      const { password, ...datas } = newUser;

      // 3, Data to front-end
      res
        .status(201)
        .json({ message: "user created successfully", data: datas });
    }
  } catch (error) {
    console.log("INTERNAL SERVER ERROR", error);
    res
      .status(500)
      .json({ message: "INTERNAL SERVER ERROR", error: error.message });
  }
});

// POST =>   /login   => login the user
app.post("/login", async (req, res) => {
  try {
    // 1, Data from front-end
    const data = req.body;
    // {
    //     "email": "",
    //     "password": "",
    // }

    // 2, Db logic
    const isUserExists = await prisma.users.findUnique({
      where: {
        email: data.email,
      },
    });

    if (isUserExists) {
      const { password, ...datas } = isUserExists;

      bcrypt.compare(
        data.password,
        isUserExists.password,
        function (err, result) {
          if (result) {
            var temp_key = jwt.sign(
              { user_id: isUserExists.user_id, email: isUserExists.email },
              "sd-rooms",
              { expiresIn: "5s" },
            );

            var main_key = jwt.sign(
              { user_id: isUserExists.user_id, email: isUserExists.email },
              "sd-main-rooms",
              { expiresIn: "15s" },
            );

            const datass = {
              token: {
                temp_key,
                main_key,
              },
              ...datas,
            };

            res
              .status(200)
              .json({ message: "Login Successfully", data: datass });
          } else {
            res.status(401).json({ message: "Password is incorrect" });
          }
        },
      );
    } else {
      res.status(404).json({ message: "Register the new user" });
    }
  } catch (error) {
    console.log("INTERNAL SERVER ERROR", error);
    res
      .status(500)
      .json({ message: "INTERNAL SERVER ERROR", error: error.message });
  }
});

// POST => /refresh
app.post("/refresh", (req, res) => {
  try {
    // 1, Data from front-end
    const data = req.body;
    // main_key

    // 2, Db logic
    jwt.verify(data.main_key, "sd-main-rooms", function (err, decoded) {
      if (!err) {
        const temp_key = jwt.sign(
          { user_id: decoded.user_id, email: decoded.email },
          "sd-rooms",
          { expiresIn: "5s" },
        );

        res.status(200).json({ message: "Token Generated", data: temp_key });
      } else {
        res.status(401).json({ message: "Invalid Token" });
      }
    });
  } catch (error) {
    console.log("INTERNAL SERVER ERROR", error);
    res
      .status(500)
      .json({ message: "INTERNAL SERVER ERROR", error: error.message });
  }
});

// GET => /user  // public => // fetch all user
app.get("/users", authMiddleware, RBAC("ADMIN"), async (req, res) => {
  // 1, Data from front-end

  // 2, DB Logic
  const user = await prisma.users.findMany();

  // 3, Data to front-end
  res.send(user);
});

// GET => /user/:user_id => fetch the user by id
app.get("/user/:user_id", authMiddleware, RBAC("USER"), async (req, res) => {
  // 1, Data from Front-end
  const { user_id } = req.params;

  // 2, DB logic
  const userData = await prisma.users.findUnique({
    where: {
      user_id: user_id,
    },
  });

  // 3, Data to front-end
  res.send(userData);
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log("Auth Api is working...", PORT);
});
