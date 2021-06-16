import Brand from "../models/brandModel.js";
import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

import { store } from "../utils/store.js";
const addBrand = asyncHandler(async (req, res) => {
  try {
    const name = req.body.name;
    const description = req.body.description;
    const isActive = req.body.isActive;

    if (!description || !name) {
      return res
        .status(400)
        .json({ error: "You must enter description & name." });
    }

    const brand = new Brand({
      name,
      description,
      isActive,
    });

    const brandDoc = await brand.save();

    res.status(200).json({
      success: true,
      message: `Brand has been added successfully!`,
      brand: brandDoc,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});
const brandList = asyncHandler(async (req, res) => {
  try {
    const brands = await Brand.find({
      isActive: true,
    }).populate("merchant", "name");

    res.status(200).json({
      brands,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});
const fetchBrands = asyncHandler(async (req, res) => {
  try {
    let brands = null;

    if (req.user.merchant) {
      brands = await Brand.find({
        merchant: req.user.merchant,
      }).populate("merchant", "name");
    } else {
      brands = await Brand.find({}).populate("merchant", "name");
    }

    res.status(200).json({
      brands,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});
const fetchBrand = asyncHandler(async (req, res) => {
  try {
    const brandId = req.params.id;

    const brandDoc = await Brand.findOne({ _id: brandId });

    if (!brandDoc) {
      res.status(404).json({
        message: `Cannot find brand with the id: ${brandId}.`,
      });
    }

    res.status(200).json({
      brand: brandDoc,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});
const brandListSelect = asyncHandler(async (req, res) => {
  try {
    let brands = null;

    if (req.user.merchant) {
      brands = await Brand.find(
        {
          merchant: req.user.merchant,
        },
        "name"
      );
    } else {
      brands = await Brand.find({}, "name");
    }

    res.status(200).json({
      brands,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});
const brandEdit = asyncHandler(async (req, res) => {
  try {
    const brandId = req.params.id;
    const update = req.body.brand;
    const query = { _id: brandId };

    await Brand.findOneAndUpdate(query, update, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Brand has been updated successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});
const brandEditActive = asyncHandler(async (req, res) => {
  try {
    const brandId = req.params.id;
    const update = req.body.brand;
    const query = { _id: brandId };

    // disable brand(brandId) products
    if (!update.isActive) {
      const products = await Product.find({ brand: brandId });
      store.disableProducts(products);
    }

    await Brand.findOneAndUpdate(query, update, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Brand has been updated successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});
const brandDelete = asyncHandler(async (req, res) => {
  try {
    const brand = await Brand.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: `Brand has been deleted successfully!`,
      brand,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

export {
  addBrand,
  brandList,
  fetchBrands,
  fetchBrand,
  brandListSelect,
  brandEdit,
  brandEditActive,
  brandDelete,
};
