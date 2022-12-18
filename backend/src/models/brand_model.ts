import { IBrand } from '@src/interfaces/IBrand';
import mongoose from 'mongoose';
import slug from 'mongoose-slug-generator'; //FROMOLD
 
//FROMOLD-START:
const options = {
  separator: '-',
  lang: 'en',
  truncate: 120,
};

mongoose.plugin(slug, options);
//FROMOLD-END

const Brand = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    slug: {
      type: String,
      slug: 'name',
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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Merchant',
      default: null,
    },
    updated: Date,
    created: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model<IBrand & mongoose.Document>('Brand', Brand);
