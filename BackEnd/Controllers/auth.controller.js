import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

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
    const existingUser = await User.findOne({ $or: [{ email }, { username }] });

    if (existingUser) {
      return res.status(400).json({
        status: "fail",
        data: {
          error:
            "User already exists. Please use a different email or username.",
        },
      });
    }

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

export const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password || email.trim() === "" || password.trim() === "") {
    return res.status(400).json({
      status: "fail",
      data: {
        error: "Email and password are required",
      },
    });
  }
  try{
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        data: {
          error: "User not found",
        },
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({
        status: "fail",
        data: {
          error: "Incorrect password",
        },
      });
    }
    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
    res.status(200).cookie("access_token", token,{
      expires: new Date(Date.now() + 86400000), // 24 hours
      httpOnly: true,
    }).json({
      username: user.username,
      email : user.email,
      access_token: token,
    });
    

  }catch(error){
    res.status(500).json({
      status: "error",
      message: "Failed to sign in user",
    });
  }
};
