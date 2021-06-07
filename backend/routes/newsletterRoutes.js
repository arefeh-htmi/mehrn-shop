import express from "express";
const router = express.Router();

import { subscribeToNewsletter } from "../utils/mailchimp.js";
import { sendEmail } from "../utils/mailgun.js";
import asyncHandler from "express-async-handler";

// const newsletterhandler = asyncHandler(async (req, res) => {
//   const email = req.body.email;

//   if (!email) {
//     return res.status(400).json({ error: "You must enter an email address." });
//   }

//   const result = await subscribeToNewsletter(email);

//   if (result.status === 400) {
//     return res.status(400).json({ error: result.title });
//   }

//   await sendEmail.sendEmail(email, "newsletter-subscription");

//   res.status(200).json({
//     success: true,
//     message: "You have successfully subscribed to the newsletter",
//   });
// });

// router.route("/subscribe").post(newsletterhandler);

// router.post("/subscribe", async (req, res) => {
//   const email = req.body.email;

//   if (!email) {
//     return res.status(400).json({ error: "You must enter an email address." });
//   }

//   const result = await subscribeToNewsletter(email);

//   if (result.status === 400) {
//     return res.status(400).json({ error: result.title });
//   }

//   await sendEmail.sendEmail(email, "newsletter-subscription");

//   res.status(200).json({
//     success: true,
//     message: "You have successfully subscribed to the newsletter",
//   });
// });

export default router;
