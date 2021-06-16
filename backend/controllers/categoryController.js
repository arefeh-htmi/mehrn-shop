import asyncHandler from "express-async-handler";
import { store } from "../utils/store.js";
import Category from "../models/contactusModel.js";
import { store } from "../utils/store.js";
const addCategory = asyncHandler(async (req, res) => {
  const name = req.body.name;
  const description = req.body.description;
  const products = req.body.products;
  const isActive = req.body.isActive;

  if (!description || !name) {
    return res
      .status(400)
      .json({ error: "You must enter description & name." });
  }

  const category = new Category({
    name,
    description,
    products,
    isActive,
  });

  category.save((err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
      });
    }

    res.status(200).json({
      success: true,
      message: `Category has been added successfully!`,
      category: data,
    });
  });
});
const categoryList = asyncHandler(async (req, res) => {
  Category.find({ isActive: true }, (err, data) => {
    if (err) {
      return res.status(400).json({
        error: "Your request could not be processed. Please try again.",
      });
    }
    res.status(200).json({
      categories: data,
    });
  });
});
const fetchCategories = asyncHandler(async (req, res) => {
  try {
    const categories = await Category.find({});
    res.status(200).json({
      categories,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});
const fetchCategory = asyncHandler(async (req, res) => {
  try {
    const categoryId = req.params.id;

    const categoryDoc = await Category.findOne({ _id: categoryId }).populate({
      path: "products",
      select: "name",
    });

    if (!categoryDoc) {
      return res.status(404).json({
        message: "No Category found.",
      });
    }

    res.status(200).json({
      category: categoryDoc,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});
const editCategory = asyncHandler(async (req, res) => {
  try {
    const categoryId = req.params.id;
    const update = req.body.category;
    const query = { _id: categoryId };

    await Category.findOneAndUpdate(query, update, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Category has been updated successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});
const editCategoryActiveId = asyncHandler(async (req, res) => {
  try {
    const categoryId = req.params.id;
    const update = req.body.category;
    const query = { _id: categoryId };

    // disable category(categoryId) products
    if (!update.isActive) {
      const categoryDoc = await Category.findOne(
        { _id: categoryId, isActive: true },
        "products -_id"
      ).populate("products");

      store.disableProducts(categoryDoc.products);
    }

    await Category.findOneAndUpdate(query, update, {
      new: true,
    });

    res.status(200).json({
      success: true,
      message: "Category has been updated successfully!",
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});
const deleteCategory = asyncHandler(async (req, res) => {
  try {
    const product = await Category.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: `Category has been deleted successfully!`,
      product,
    });
  } catch (error) {
    res.status(400).json({
      error: "Your request could not be processed. Please try again.",
    });
  }
});

export {
  addCategory,
  categoryList,
  fetchCategories,
  fetchCategory,
  editCategory,
  editCategoryActiveId,
  deleteCategory,
};
