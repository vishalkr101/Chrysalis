import express from "express";
import dotenv from "dotenv";
import Router from "./Routes/dishRoutes.js";
import cors from "cors";

const app = express();
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use('/', Router);

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});