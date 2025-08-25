import express, { Application, Request, Response } from "express";
import mongoose, { Schema } from "mongoose";

const app: Application = express();

app.use(express.json());

const noteSchema = new Schema({
  title: { type: String, required: true, trim: true },
  content: { type: String, default: "" },
  category: {
    type: String,
    enum: ["personal", "work", "study", "other"],
    default: "personal",
  },
  pinned: {
    type: Boolean,
    default: false,
  },
  tags: {
    label: { type: String, required: true },
    color: { type: String, default: "gray" },
  },
});

const Note = mongoose.model("Note", noteSchema);

app.post("/notes/create-note", async (req: Request, res: Response) => {
  const body = req.body;

  // Approach 1 of creating data
  // const myNote = new Note({
  //   title: "Learning Node",
  //   tags: {
  //     label: "database",
  //   },
  // });

  // Approach 2 of creating data
  const note = await Note.create(body);

  res.status(201).json({
    success: true,
    message: "Note created successfully",
    note,
  });
});

app.get("/notes", async (req: Request, res: Response) => {
  const notes = await Note.find();
  res.status(200).json({
    success: true,
    message: "Notes fetched successfully",
    notes,
  });
});

app.get("/notes/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const note = await Note.findById(noteId);
  res.status(201).json({
    success: true,
    message: "Note fetched successfully",
    note,
  });
});

app.patch("/notes/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const updatedBody = req.body;
  const note = await Note.findByIdAndUpdate(noteId, updatedBody, { new: true });
  res.status(201).json({
    success: true,
    message: "Note updated successfully",
    note,
  });
});

app.delete("/notes/:noteId", async (req: Request, res: Response) => {
  const noteId = req.params.noteId;
  const note = await Note.findByIdAndDelete(noteId);
  res.status(201).json({
    success: true,
    message: "Note deleted successfully",
    note,
  });
});

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome To Note App!");
});

export default app;
