import { compareSync, hashSync } from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

export const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  if (!userName || !email || !password) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const existingUser = await User.findOne({ userName });
    console.log(existingUser);
    if (existingUser) {
      return res
        .status(400)
        .json({ message: "User with this name already exists" });
    }

    const hashedPassword = hashSync(password, 10);

    const newUser = await User.create({
      userName,
      email,
      password: hashedPassword,
    });

    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

export const loginUser = async (req, res) => {
  let { email, password } = req.body;

  try {
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    email = email.toLowerCase();

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (!compareSync(password, user.password)) {
      return res.status(400).json({ message: "Wrong password" });
    }
    const token = jwt.sign({ userId: user._id }, "saad@123", {
      expiresIn: "2d",
    });
    res.status(200).json({ id: user._id, userName: user.userName, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
