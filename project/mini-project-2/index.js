const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
app.use(express.json());
const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.send("Api is working ");
});

// GET => localhost:8000/ => Fetch all restaurant
app.get("/restaurant", async (req, res) => {
  // 1, Data from front-end
  // 2, Db logic
  const restaurantData = await prisma.restaurants.findMany();

  // 3, Data to front-end
  res.json({ message: "Restaurant data", data: restaurantData });
});

// GET => localhost:8000/restaurant/:res_id  => Fetch the restaurant by id
app.get("/restaurants/:res_id", async (req, res) => {
  try {
    // 1, Data from front-end
    const { res_id } = req.params;

    if (!res_id) {
      return res.status(400).json({ message: "Restaurant id is required" });
    }

    // 2, Db logic
    const restaurantDataById = await prisma.restaurants.findUnique({
      where: {
        restaurant_id: res_id,
      },
    });

    // 3, Data to front-end
    res
      .status(200)
      .json({ message: "Data fetched successfully", data: restaurantDataById });
  } catch (error) {
    console.log("Internal server error", error);
    res
      .status(500)
      .json({ message: "INTERNAL SERVER ERROR", error: error.message });
  }
});

// POST => localhost:8000/restaurant => create a restaurant
app.post("/restaurants", async (req, res) => {
  try {
    // 1, Data from front-end
    const { name, location, image_url, offer } = req.body;

    if (!name || !location || !image_url || !offer) {
      res.status(400).json({ message: "All fields are required" });
    }

    // 2, Db logic
    const newRestaurantData = await prisma.restaurants.create({
      data: {
        name,
        location,
        image_url,
        offer,
      },
    });

    // 3, Data to front-end
    res.status(201).json({
      message: "Restaurant created",
      data: newRestaurantData,
    });
  } catch (error) {
    console.log("INTERNAL SERVER ERROR");
    res
      .status(500)
      .json({ message: "INTERNAL SERVER ERROR", error: error.message });
  }
});

// PUT => localhost:8000/restaurant/:res_id => update the restaurant
app.put("/restaurant", async (req, res) => {
  try {
    // 1, Data from front-end
    const data = req.body;

    // 2, Db logic
    const newUpdatedRestaurant = await prisma.restaurants.update({
      where: {
        restaurant_id: data.restaurant_id,
      },
      data: {
        name: data.name,
        location: data.location,
        image_url: data.image_url,
        offer: data.offer,
      },
    });

    // 3, Data to front-end
    res
      .status(201)
      .json({ message: "Restaurant Data updated", data: newUpdatedRestaurant });
  } catch (error) {
    res
      .status(500)
      .json({ message: "INTERNAL SERVER ERROR", error: error.message });
    console.log(error);
  }
});

// DELETE => localhost:8000/restaurant=> Delete the restaurant
app.delete("/restaurant", async (req, res) => {
  try {
    // 1, Data from front-end
    const data = req.body;

    // 2, Db logic
    await prisma.restaurants.delete({
      where: {
        restaurant_id: data.restaurant_id,
      },
    });

    // 3, Data to front-end
    res.status(201).json({ message: "data deleted successfully" });
  } catch (error) {
    console.log("INTERNAL SERVER ERROR", error);
    res
      .status(500)
      .json({ message: "INTERNAL SERVER ERROR", error: error.message });
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log("Api is ready to work..", PORT);
});
