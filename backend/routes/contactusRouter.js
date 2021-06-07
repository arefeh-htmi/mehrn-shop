import express from "express";
const router = express.Router();
import {contactusController} from "../controllers/contactusController.js";

router.post("/add", contactusController);
export default router;
