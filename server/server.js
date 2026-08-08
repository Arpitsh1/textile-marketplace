const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const dashboardRoutes = require("./routes/dashboardRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");
const supplierRoutes = require("./routes/supplierRoutes");

dotenv.config();

// Connect Database
connectDB();

// Create Express app
const app = express();


// Middleware
app.use(cors({
    origin:[
        "http://localhost:5173",
        "https://textile-marketplace-ogzbr5bk6-arpitsh1s-projects.vercel.app"
    ],
    credentials:true
}));

app.use(express.json());


// Routes
app.use("/api/auth", authRoutes);

app.use("/api", dashboardRoutes);

app.use("/api/products", productRoutes);

app.use("/api/cart", cartRoutes);

app.use("/api/orders", orderRoutes);

app.use("/api/supplier", supplierRoutes);

app.use("/api/reviews", require("./routes/reviewRoutes"));


// Health Route
app.get("/api/health", (req,res)=>{
    res.json({
        message:"Server is running"
    });
});


// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
});