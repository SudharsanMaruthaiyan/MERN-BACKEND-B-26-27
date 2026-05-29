const express = require("express");
const { PrismaClient } = require("@prisma/client");

const app = express();
const prisma = new PrismaClient();

app.get("/", (req, res) => {
  // 1, Data from front-end
  // 2, DB Logic
  // 3, Data to front-end
  res.send("Api is working for final project...");
});

// GET => /products => Get all products data
app.get("/products", async (req, res) => {
  try {
    // 1, Data from front-end

    // 2, DB Logic
    const productData = await prisma.products.findMany();

    // 3, Data to front-end
    res.status(200).json({
      message: "successfully fetched the products data",
      data: productData,
    });
  } catch (error) {
    console.log("INTERNAL SERVER ERROR", error);
    res
      .status(500)
      .json({ message: "INTERNAL SERVER ERROR", error: error.message });
  }
});

// GET => /products/:prduct_id => Get all products data
app.get("/products/:product_id", async (req, res) => {
  try {
    // 1, Data from front-end
    const { product_id } = req.params;

    // 2, DB Logic
    const productDetailData = await prisma.products.findUnique({
      where: {
        product_id: product_id,
      },
    });

    // 3, Data to front-end
    res.status(200).json({ message: "Data Fetched", data: productDetailData });
  } catch (error) {
    console.log("INTERNAL SERVER ERROR", error);
    res
      .status(500)
      .json({ message: "INTERNAL SERVER ERROR", error: error.message });
  }
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log("Api is wokring on 8000");
});
