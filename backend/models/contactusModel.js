import Mongoose from "mongoose";
const { Schema } = Mongoose;

// Contact Schema
const ContactSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
  },
  message: {
    type: String,
    trim: true,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

const Contact = Mongoose.model("Contact", ContactSchema);
export default Contact;
