import express from "express";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";
import { connectDB } from "./config/db.js";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cookieParser from "cookie-parser";

const app = express();

app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use(express.json());

connectDB();

app.use("/quickSell", productRoutes);

app.use("/quickSell/user", userRoutes);

app.use("/quickSell/cart", cartRoutes);

app.use("/quickSell/order", orderRoutes);

app.get("/", (req, res) => {
  res.send("server running");
});

app.listen(process.env.PORT, () => {
  console.log("server listening");
});
