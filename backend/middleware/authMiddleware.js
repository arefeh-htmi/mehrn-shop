import jwt from "jsonwebtoken";
import passport from "passport";
import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (req.headers.authorization) {
    try {
      token =
        (await jwt.decode(req.headers.authorization.split(" ")[1])) ||
        req.headers.authorization;

      console.log(token, 1);

      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded, 2);

      req.user = await User.findById(decoded.id).select("-password");
      console.log(token, decoded, req.user, 3);

      next();
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("Not authorized, token failed");
    }
  }

  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

const auth = passport.authenticate("jwt", { session: false });

export { protect, auth };
