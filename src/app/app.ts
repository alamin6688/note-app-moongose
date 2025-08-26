import express, { Application, Request, Response } from "express";
import { notesRoutes } from "./controllers/notes.controller";
import { usersRoutes } from "./controllers/user.controller";

const app: Application = express();

app.use(express.json());

app.use("/notes", notesRoutes);
app.use("/users", usersRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome To Note App!");
});

export default app;
