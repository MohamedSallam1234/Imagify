import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ statusCode: 400, message: "Please fill all fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = new userModel(userData);
    const user = await newUser.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: 3600,
    });
    res.json({
      statusCode: 200,
      message: "User registered successfully",
      user: { name: user.name },
      token,
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.json({ statusCode: 500, message: error.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.json({ statusCode: 400, message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.json({ statusCode: 400, message: "Invalid credentials" });
    } else {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: 3600,
      });
      res.json({
        statusCode: 200,
        message: "User logged in successfully",
        user: { name: user.name },
        token,
      });
    }
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.json({ statusCode: 500, message: error.message });
  }
};

const userCredits = async (req, res) => {
  try {
    const { userId } = req;

    if (!userId) {
      return res
        .status(400)
        .json({ statusCode: 400, message: "User ID not found" });
    }

    const user = await userModel.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ statusCode: 404, message: "User not found" });
    }

    res.json({
      statusCode: 200,
      creditBalance: user.creditBalance,
      user: { name: user.name },
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).json({ statusCode: 500, message: "Server Error" });
  }
};

export { registerUser, loginUser, userCredits };
