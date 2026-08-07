require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("../models/Product");


const products = [
  {
    name: "Premium Cotton Fabric",
    category: "Cotton",
    description: "High quality cotton fabric",
    price: 500,
    colors: ["White", "Blue"],
    stock: 200
  },

  {
    name: "Silk Wedding Fabric",
    category: "Silk",
    description: "Luxury silk for wedding dresses",
    price: 1200,
    colors: ["Red", "Gold"],
    stock: 50
  }
];


const seed = async()=>{

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB Connected");

    await Product.deleteMany();

    await Product.insertMany(products);

    console.log("Products Added");

    process.exit();

};


seed();