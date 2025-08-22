import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";

export const getUserData = async (req, res) => {
  try {
    // get token from cookies
    const token = req.cookies.token;
    if (!token) {
      return res.json({ success: false, message: "No token provided" });
    }

    // decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.id;

    // fetch user from DB
    const user = await userModel.findById(userId);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }

    // send user data
    res.json({
      success: true,
      userData: {
        name: user.name,
        email: user.email,
        isAccountVerified: user.isAccountVerified,
      },
    });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
