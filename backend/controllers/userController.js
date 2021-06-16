import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";
import { subscribeToNewsletter } from "../utils/mailchimp.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email) {
    return res.status(400).json({ error: "You must enter an email address." });
  }
  if (!password) {
    return res.status(400).json({ error: "You must enter a password." });
  }

  const user = await User.findOne({ email });
  if (user) {
    const matchPassword = await user.matchPassword(password);
    if (matchPassword) {
      res.status(200).json({
        success: true,
        isAdmin: user.isAdmin,
        token: generateToken(user._id),
        user: {
          id: user._id,
          name: `${user.firstName + " " + user.lastName}`,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,
          isAdmin: user.isAdmin,
        },
      });
    } else {
      res.status(400).json({
        success: false,
        error: "Password Incorrect",
      });
    }
  } else {
    return res
      .status(400)
      .send({ error: "No user found for this email address." });
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const {
    email,
    firstName,
    lastName,
    password,
    confirmPassword,
    isSubscribed,
  } = req.body;
  // checking fields
  if (!email) {
    return res.status(400).json({ error: "You must enter an email address." });
  }

  if (!firstName || !lastName) {
    return res.status(400).json({ error: "You must enter your full name." });
  }

  if (!password || !confirmPassword) {
    return res.status(400).json({ error: "You must enter a password." });
  }
  //finding user, if no user was found, throwing error
  User.findOne({ email }, async (err, existingUser) => {
    if (err) {
      next(err);
    }
    // if user was registered before
    if (existingUser) {
      return res
        .status(400)
        .json({ error: "That email address is already in use." });
    }
  });

  // checking newsletter subscription field
  let subscribed = false;
  if (isSubscribed) {
    const result = await subscribeToNewsletter(email);

    if (result.status === "subscribed") {
      subscribed = true;
    }
  }
  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
  });

  if (user) {
    res.status(200).json({
      success: true,
      subscribed,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      user: {
        id: user._id,
        name: `${user.firstName + " " + user.lastName}`,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        isAdmin: user.isAdmin,

      },
    });
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      name: user.name,
      isAdmin: user.isAdmin,
      id: user._id,
      name: `${user.firstName + " " + user.lastName}`,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.firstName = req.body.firstName || user.firstName;
    user.lastName = req.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      id: user._id,
      name: `${user.firstName + " " + user.lastName}`,
      firstName: user.firstName,
      lastName: user.lastName,
      isAdmin: user.isAdmin,
      email: user.email,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

// @desc    Delete user
// @route   DELETE /api/users/:id
// @access  Private/Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Get user by ID
// @route   GET /api/users/:id
// @access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// @desc    Update user
// @route   PUT /api/users/:id
// @access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.firstName = req.body.firstName || user.name;
    user.lastName = rq.body.lastName || user.lastName;
    user.email = req.body.email || user.email;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();

    res.json({
      id: user._id,
      name: `${user.firstName + " " + user.lastName}`,
      firstName: user.firstName,
      lastName: user.lastName,
      role: updatedUser.role,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
