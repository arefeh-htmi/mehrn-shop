import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers/userController.js";
import passport from "passport";
import { protect } from "../middleware/authMiddleware.js";
import { role } from "../middleware/rolecheckMiddleware.js";
//register
  router.post("/",registerUser)
  router.get("/",protect, role.checkRole(role.ROLES.Admin), getUsers);
//login
router.post("/login", authUser);
// google
router.get(
  "/google",
  passport.authenticate("google", {
    session: false,
    scope: ["profile", "email"],
    accessType: "offline",
    approvalPrompt: "force",
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/login",
    session: false,
  }),
  (req, res) => {
    res.json({
      id: user.id,
      name: `${user.firstName + user.lastName}`,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });
  }
);
// facebook
router.get(
  "/facebook",
  passport.authenticate("facebook", {
    session: false,
    scope: ["public_profile", "email"],
  })
);
router.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    failureRedirect: "/",
    session: false,
  }),
  (req, res) => {
    res.json({
      id: user.id,
      name: `${user.firstName + user.lastName}`,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });
  }
);
// geting profile and editing it by user
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// deleting, geting or editting user by admin
router
  .route("/:id")
  .delete(protect, role.checkRole(role.ROLES.Admin), deleteUser)
  .get(protect, role.checkRole(role.ROLES.Admin), getUserById)
  .put(protect, role.checkRole(role.ROLES.Admin), updateUser);

export default router;
