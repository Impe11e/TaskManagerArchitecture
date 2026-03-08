import express from "express";
import profileRouter from "./routes/profilesRoutes.js";

const app = express();

app.set("query parser", "extended");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/profiles", profileRouter);

export default app;
