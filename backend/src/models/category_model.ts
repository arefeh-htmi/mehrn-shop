import { ICategory } from '@src/interfaces/ICategory';
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

const Category = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    image: {
      data: Buffer,
      contentType: String,
    },
    slug: {
      type: String,
      slug: 'name',
      unique: true,
    },
    description: {
      type: String,
      trim: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
      },
    ],
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

export default mongoose.model<ICategory & mongoose.Document>('Category', Category);
