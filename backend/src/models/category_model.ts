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
    },
    image: {
      contentType: String,
    },
    slug: {
      type: String,
      slug: 'name',
    },
    description: {
      type: String,
    },
    isActive: {
      type: Boolean,
      default: true,
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

export default mongoose.model<ICategory & mongoose.Document>('Category', Category);
