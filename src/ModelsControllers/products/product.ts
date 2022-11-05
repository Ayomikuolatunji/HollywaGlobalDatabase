import { RequestHandler } from "express";
import { StatusCodes } from "http-status-codes";
import { Op } from "sequelize";
import fs from "fs";
import path from "path";
import { throwError } from "../../middleware/cachError";
import db from "./product.model";
import { productTypes } from "../../typings/ModelTypings";

const createProducts: RequestHandler = async (req, res, next) => {
  let imageUrl = req.body.image;
  try {
    if (!req.body.adminId) {
      throwError("admin is not found", 404);
    }
    const products = new db<productTypes>({
      name: req.body.name,
      price: req.body.price,
      description: req.body.description.trim(),
      type: req.body.type || "general",
      image: req.body.image,
      adminId: req.body.adminId,
      status: req.body.status,
      currency: req.body.currency,
    });
    await products.save();
    res.status(201).json({ message: "Product created successfully", products });
  } catch (error: any) {
    clearImage(imageUrl || "");
    next(error);
  }
};

const getProducts: RequestHandler = async (req, res, next) => {
  try {
    const adminId = req.query.adminId;
    if (!adminId)
      throwError(
        "adminId not passed to the query params",
        StatusCodes.NOT_FOUND
      );
    const product = await db.find({ adminId }).exec();
    if (!product) {
      throwError("Products not found", 404);
    }
    res
      .status(200)
      .json({ message: "Products retrieved successfully", product });
  } catch (error: any) {
    next(error);
  }
};

const deleteProduct: RequestHandler = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const adminId = req.query.adminId;
    // remove image from folder
    const productImage: any = await db.findOne(
      { _id: productId },
      { adminId: adminId }
    );
    if (!productImage) {
      throwError("Product not found", 404);
    }
    clearImage(productImage.image);
    await db.deleteOne({
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
    const product = await db.find({ adminId: adminId });
    if (!product) {
      throwError("Product not found with adminId provided", 404);
    }
    // update using products ids of the admin and status  array
    const updateProduct = statuses.map((status: string, i: number) => {
      return db.updateMany(
        { _id: productIds[i] },
        { status: status },
        {
          upsert: true,
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
  let imageUrl = req.body.image;
  try {
    const productId = req.params.productId;
    const adminId = req.query.adminId;
    const product: any = await db.findOne({
      where: {
        id: productId,
        adminId: adminId,
      },
    });
    if (!product) {
      throwError("Product not found with adminId provided", 404);
    }
    if (product) {
      if (product.image !== req.body.image) {
        clearImage(product?.dataValues.image);
      }
    }
    const updatedProduct = await db.updateOne(
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
    clearImage(imageUrl || "");
    next(error);
  }
};

const getProduct: RequestHandler = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const adminId = req.query.adminId;
    const product = await db.findOne({ _id: productId, adminId });
    if (!product) {
      throwError("Product not found with adminId provided", 404);
    }
    res
      .status(200)
      .json({ message: "Product retrieved successfully", product });
  } catch (error) {
    next(error);
  }
};

const getUserProducts: RequestHandler = async (req, res, next) => {
  try {
    const fieldType = req.query.product_type;
    console.log("fieldType", fieldType);
    if (fieldType === "all") {
      const product = await db.find({});
      if (!product) {
        throwError("Product not found with adminId provided", 404);
      }
      res.status(200).json({
        message: "Product retrieved successfully",
        product,
        count: product.length,
      });
    } else if (fieldType !== "all") {
      const product = await db.find({
        where: {
          [Op.and]: [
            {
              type: fieldType,
            },
          ],
        },
      });
      if (!product.length) {
        throwError("query key is invalid", StatusCodes.NOT_FOUND);
        return;
      }
      res.status(StatusCodes.OK).json({
        product,
        message: "Product retrieved successfully",
        count: product.length,
      });
    }
  } catch (error) {
    next(error);
  }
};

const bulkyDeleteFunction: RequestHandler = async (req, res, next) => {
  try {
    const productIds = req.body.productIds;
    const adminId = req.query.adminId;
    // find admin products
    console.log("productIds", productIds);
    const adminProducts = await db.find({
      where: {
        adminId: adminId,
      },
    });
    if (!adminProducts) {
      throwError("admin does not have deletable products", 404);
    }
    const findAllProducts = productIds.map((id: string) => {
      return db.findOne({ _id: id }, { adminId: adminId });
    });
    await (
      await Promise.all(findAllProducts)
    ).map((product) => {
      clearImage(product?.dataValues.image);
    });
    // destroy bulky products
    const destroyBulkyProducts = productIds.map((id: string) => {
      return db.deleteMany({
        where: {
          id: id,
          adminId: adminId,
        },
      });
    });
    const sendDestroyedproduct = await Promise.all(destroyBulkyProducts);
    res.status(200).json({
      message: "Bulky deleted successfully",
      destroyBulkyProducts: sendDestroyedproduct,
    });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

const createProductsDepartments: RequestHandler = async (req, res, next) => {
  try {
    const adminId = req.query.adminId;

    const findDepartment = await db.findOne({
      where: {
        name: req.body.name,
      },
    });
    if (findDepartment) {
      throwError("Department already exits", 422);
    }
    const departments = new db({
      name: req.body.name,
      adminId: adminId,
    });
    await departments.save();
    return res
      .status(201)
      .json({ message: "Departments created successfully", departments });
  } catch (error) {
    next(error);
  }
};

const getAllProductsDepartments: RequestHandler = async (req, res, next) => {
  try {
    const getAll = await db.find({});
    res.status(200).json({
      message: "All available departments fetched successfully",
      departments: getAll,
    });
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
  getProduct,
  bulkyDeleteFunction,
  createProductsDepartments,
  getAllProductsDepartments,
  getUserProducts,
};
