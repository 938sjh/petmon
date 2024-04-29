import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import userRouter from "./routes/user.js";
import productRouter from "./routes/product.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.use(cookieParser());
app.use(cors(
  {origin:"http://localhost:3000",
   credentials:true}));

const connect = mongoose
  .connect(process.env.MONGO_URI)
  .then(console.log("MongoDB connected..."))
  .catch((err) => console.log(err));

const port = process.env.PORT || 4000;



app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.use("/api/users", userRouter);
app.use("/api/product", productRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});