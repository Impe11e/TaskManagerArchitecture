import express, { type Express } from "express";

import getProfileRouter from "../presentation/profiles/routes/profilesRoutes.js";
import profilesContainer from "./compose_roots/profileRoot.js";

const app: Express = express();

app.set("query parser", "extended");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/profiles", getProfileRouter(profilesContainer.profileController));

export default app;
