import { model, Schema } from "mongoose";
import { IUser } from "../interfaces/user.interface";
import validator from 'validator';

const userSchema = new Schema<IUser>({
  firstName: {
    type: String,
    required: [true, "First Name is required"],
    trim: true,
    minLength: [3, "First Name must be at least 3 characters, got {VALUE}"],
    maxLength: [10, "First Name must be at most 10 characters, got {VALUE}"],
  },
  lastName: {
    type: String,
    required: [true, "Last Name is required"],
    trim: true,
    minLength: [3, "Last Name must be at least 3 characters, got {VALUE}"],
    maxLength: [10, "Last Name must be at most 10 characters, got {VALUE}"],
  },
  age: {
    type: Number,
    required: [true, "Age is required"],
    min: [18, "Age must be at least 18, got {VALUE}"],
    max: [60, "Age must be at most 60, got {VALUE}"],
  },
  email: {
    type: String,
    unique: [true, "Email must be unique"],
    required: [true, "Email is required"],
    lowercase: true,
    trim: true,
    validate: [validator.isEmail, "Please fill a valid email address"],

    // validate: {
    //   validator: function (value) {
    //     return /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(value);
    //   },
    //   message: function (props) {
    //     return `${props.value} is not a valid email address!`;
    //   },
    // },
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  role: {
    type: String,
    uppercase: true,
    enum: {
      values: ["USER", "ADMIN", "SUPERADMIN"],
      message: "{VALUE} is not supported",
    },
    default: "USER",
  },
});

export const User = model("User", userSchema);
