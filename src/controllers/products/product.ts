import { RequestHandler } from "express";
const fs = require("fs");
const path = require("path");
import { throwError } from "../../middleware/cachError";
import { db } from "../../models";

const createProducts: RequestHandler = async (req, res, next) => {
  let imageUrl = req.body.image;
  try {
    if (!req.body.adminId) {
      throwError("admin is not found", 404);
    }
    const products = await db.products.create({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description.trim(),
      type: req.body.type || "general",
      image: req.body.image,
      adminId: req.body.adminId,
      status: req.body.status,
      currency: req.body.currency,
    });
    res.status(201).json({ message: "Product created successfully", products });
  } catch (error: any) {
    clearImage(imageUrl || "");
    next(error);
  }
};

const getProducts: RequestHandler = async (req, res, next) => {
  try {
    const products = await db.products.findAll({
      where: {
        adminId: req.query.adminId,
      },
    });
    if (!products) {
      throwError("Products not found", 404);
    }
    res
      .status(200)
      .json({ message: "Products retrieved successfully", products });
  } catch (error: any) {
    next(error);
  }
};

const deleteProduct: RequestHandler = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const adminId = req.query.adminId;
    // remove image from folder
    const productImage: any = await db.products.findOne({
      where: {
        id: productId,
        adminId: adminId,
      },
    });
    if (!productImage) {
      throwError("Product not found", 404);
    }
    clearImage(productImage.image);
    await db.products.destroy({
      where: {
        id: productId,
        adminId: adminId,
      },
    });
    res
      .status(200)
      .json({ message: "Product deleted successfully", productImage });
  } catch (error) {
    next(error);
  }
};

const changeProductStatus: RequestHandler = async (req, res, next) => {
  try {
    const productIds = req.body.productIds;
    const adminId = req.query.adminId;
    const statuses = req.body.status;
    const product = await db.products.findAll({
      where: {
        adminId: adminId,
      },
    });
    if (!product) {
      throwError("Product not found with adminId provided", 404);
    }
    // update using products ids of the admin and status  array
    const updateProduct = statuses.map((status: string, i: number) => {
      return db.products.update(
        {
          status: status,
        },
        {
          where: {
            id: productIds[i],
          },
        }
      );
    });
    await Promise.all(updateProduct);
    res
      .status(200)
      .json({ message: "Product status changed successfully", product });
  } catch (error) {
    next(error);
  }
};

const editProduct: RequestHandler = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const adminId = req.query.adminId;
    const product = await db.products.findOne({
      where: {
        id: productId,
        adminId: adminId,
      },
    });
    if (!product) {
      throwError("Product not found with adminId provided", 404);
    }
    const updatedProduct = await db.products.update(
      {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description.trim(),
        type: req.body.type || "general",
        image: req.body.image,
        adminId: req.body.adminId,
        status: req.body.status,
        currency: req.body.currency,
      },
      {
        where: {
          id: productId,
          adminId: adminId,
        },
      }
    );
    res
      .status(200)
      .json({ message: "Product updated successfully", updatedProduct });
  } catch (error) {
    next(error);
  }
};

const clearImage = (filePath: string) => {
  filePath = path.join(__dirname, "../../../", filePath);
  fs.unlink(filePath, (err: any) => console.log(err));
};

export {
  createProducts,
  getProducts,
  deleteProduct,
  changeProductStatus,
  editProduct,
};
