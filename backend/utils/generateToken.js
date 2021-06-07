import jwt from "jsonwebtoken";
// THIS FUNCTION USES JSONWEBTOKEN TO GENERATE A TOKEN
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_TOKENLIFE,
  });
};

export default generateToken;
