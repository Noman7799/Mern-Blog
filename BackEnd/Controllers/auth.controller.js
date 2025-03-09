import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  const { username, password, email } = req.body;

  if (
    !username ||
    !password ||
    !email ||
    username.trim() === "" ||
    password.trim() === "" ||
    email.trim() === ""
  ) {
    return res.status(400).json({
      status: "fail",
      data: {
        error: "All fields are required",
      },
    });
  }

  try {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      password: hash,
      email,
    });

    await newUser.save();

    res.status(201).json({
      status: "success",
      data: {
        message: "User registered successfully",
      },
    });
  } catch (error) {
    res.status(500).json({
      status: "error",
      message: "Failed to register user",
    });
  }
};
