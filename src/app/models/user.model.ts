import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "First Name must be at least 3 characters, got {VALUE}"],
    maxLength: [10, "First Name must be at most 10 characters, got {VALUE}"],
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
    minLength: [3, "Last Name must be at least 3 characters, got {VALUE}"],
    maxLength: [10, "Last Name must be at most 10 characters, got {VALUE}"],
  },
  age: {
    type: Number,
    required: true,
    min: [18, "Age must be at least 18, got {VALUE}"],
    max: [60, "Age must be at most 60, got {VALUE}"],
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    uppercase: true,
    enum: ["USER", "ADMIN", "SUPERADMIN"],
    default: "USER",
  },
});

export const User = model("User", userSchema);
