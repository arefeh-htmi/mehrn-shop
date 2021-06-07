import Mongoose from "mongoose";
import slug from "mongoose-slug-generator";
const { Schema } = Mongoose;

const options = {
  separator: "-",
  lang: "en",
  truncate: 120,
};

Mongoose.plugin(slug, options);

// Brand Schema
const BrandSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  slug: {
    type: String,
    slug: "name",
    unique: true,
  },
  image: {
    data: Buffer,
    contentType: String,
  },
  description: {
    type: String,
    trim: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  merchant: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Merchant",
    default: null,
  },
  updated: Date,
  created: {
    type: Date,
    default: Date.now,
  },
});

const Brand = Mongoose.model("Brand", BrandSchema);
export default Brand;
