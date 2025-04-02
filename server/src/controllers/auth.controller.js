import jwt from "jsonwebtoken";
import config from "../config/env.config.js";
import redisClient from "../config/redis.config.js";
import { loginUser, registerUser } from "../service/auth.service.js";

export const Register = async (req, res, next) => {
  const { email, password, name } = req.body;

  try {
    const user = await registerUser({ name, email, password });

    res.status(201).json({
      success: true,
      message: "User created Successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
};

export const Login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    // console.log(email, password, name);
    const { existUser, token } = await loginUser({ email, password });

   res
  .status(200)
  .cookie("token", token, {
    expires: new Date(Date.now() + 3 * 60 * 60 * 1000),
    httpOnly: true, // Secure ke saath httpOnly ko true rakho
   secure: false, // ✅ Localhost ke liye false
    sameSite: "Lax", // ✅ None ki jagah Lax try karo  })
  .json({
    success: true,
    message: "User Logged In Successfully",
  });
  } catch (error) {
    next(error);
  }
};

//  Logout - Blacklist Token
export const Logout = async (req, res, next) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) return res.status(400).json({ message: "No token provided" });

  try {
    const decoded = jwt.verify(token, config.JWT_SEC);

    //  Blacklist token
    await redisClient.set(`blacklist:${token}`, "true", "EX", 3600);
    await redisClient.del(`user:${decoded._id}:token`);

    res.json({ message: "Logged out successfully" });
  } catch (err) {
    next(err);
  }
};
