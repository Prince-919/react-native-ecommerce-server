import { User } from "./userModel.js";

// Log In -> http://localhost:8000/api/v1/user/login
export const login = (req, res, next) => {
  res.send("Login");
};

// Sign Up -> http://localhost:8000/api/v1/user/new
export const signup = async (req, res, next) => {
  const { name, email, password, address, city, country, pinCode } = req.body;

  await User.create({ name, email, password, address, city, country, pinCode });

  res.status(201).json({
    success: true,
    message: "Registered successfully",
  });
};
