const Product = require("../models/productModel.js");

const disableProducts = (products) => {
  let bulkOptions = products.map((item) => {
    return {
      updateOne: {
        filter: { _id: item._id },
        update: { isActive: false },
      },
    };
  });

  Product.bulkWrite(bulkOptions);
};
export { disableProducts };
