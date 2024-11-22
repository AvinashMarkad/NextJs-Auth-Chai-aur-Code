import { verify } from "crypto";
import mongoos from "mongoose";
import { unique } from "next/dist/build/utils";
import { type } from "os";

const userSchema = new mongoos.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: [true, "Username already exists"], // unique is not a validator
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: stringify,
  forgotPasswordTokenExpire: Date,
  verificationToken: string,
  verificationTokenExpire: Date,
});

const User = mongoos.model("User", userSchema);

export default User;
