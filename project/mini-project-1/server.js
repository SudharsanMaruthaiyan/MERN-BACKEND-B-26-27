const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
app.use(express.json());
const prisma = new PrismaClient();

app.get("/", (req, res) => {
  // 1, Data from front-end

  // 2, DB Logic

  // 3, data to front-end
  res.send("Api is working....");
});

// GET => localhost:8000/student => Fetch all students
app.get("/student", async (req, res) => {
  // 1, Data from front-end

  // 2, Db logic
  const studentData = await prisma.students.findMany();

  // 3, Data to front-end
  res.send(studentData);
});

// GET =>  localhost:8000/student => Fetch the students by id
app.get("/student/:roll_no", async (req, res) => {
  // 1, Data from front-end
  const { roll_no } = req.params;

  // 2, Db logic
  const studentDataById = await prisma.students.findUnique({
    where: {
      roll_no: roll_no,
    },
  });

  // 3, Data to front-end
  res.send(studentDataById);
});

// POST => localhost:8000/student => create a student
app.post("/student", async (req, res) => {
  // 1, Data from front-end
  const data = req.body;
  // {
  // "rool_no": 1
  // "name": "raj"
  // "gender": "male"
  // "std": "10th"
  // "blood_group": "ab+"
  // }
  // console.log(data);

  // 2, Db logic
  const newStudentData = await prisma.students.create({
    data: {
      roll_no: data.roll_no,
      name: data.name,
      gender: data.gender,
      std: data.std,
      blood_group: data.blood_group,
    },
  });

  // 3, Data to front-end
  res.send("Student Created", newStudentData);
});

// PUT => localhost:8000/student => update the student
app.put("/student", async (req, res) => {
  // 1, Data from front-end
  const data = req.body;
  // {
  // "rool_no": 1
  // "name": "raj 123"
  // "gender": "male"
  // "std": "10th"
  // "blood_group": "ab+"
  // }

  // 2, Db logic
  const newUpdatedData = await prisma.students.update({
    where: {
      roll_no: data.roll_no,
    },
    data: {
      roll_no: data.roll_no,
      name: data.name,
      std: data.std,
      gender: data.gender,
      blood_group: data.blood_group,
    },
  });

  // 3, Data to front-end
  res.send("Stdent data updated", newUpdatedData);
});

// DELETE =>  localhost:8000/student => Delete the student
app.delete("/student", async (req, res) => {
  // 1, Data from front-end
  const data = req.body;

  // 2, Db logic
  await prisma.students.delete({
    where: {
      roll_no: data.roll_no,
    },
  });

  // 3, Data to front-end
  res.send("Student data deleted");
});

const PORT = 8000;

app.listen(PORT, () => {
  console.log("Api is working on..", PORT);
});
