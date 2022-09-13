import { Sequelize, DataTypes, Op } from "sequelize";

import config from "../database/dbConfig";
import userModel from "./user/user.model";
import productModel from "./products/products.model";
import userPaymentModel from "./user/payment.model";
import industryModel from "./industries/industry.model";
import userAddressModel from "./user/userAddress.model";
import produtCategory from "./products/product_category.model";
import adminModel from "./admin/admin.model";

const operatorsAliases = {
    $eq: Op.eq,
    $ne: Op.ne,
    $gte: Op.gte,
    $gt: Op.gt,
    $lte: Op.lte,
    $lt: Op.lt,
    $not: Op.not,
    $in: Op.in,
    $notIn: Op.notIn,
    $is: Op.is,
    $like: Op.like,
    $notLike: Op.notLike,
    $iLike: Op.iLike,
    $notILike: Op.notILike,
    $regexp: Op.regexp,
    $notRegexp: Op.notRegexp,
    $iRegexp: Op.iRegexp,
    $notIRegexp: Op.notIRegexp,
    $between: Op.between,
    $notBetween: Op.notBetween,
    $overlap: Op.overlap,
    $contains: Op.contains,
    $contained: Op.contained,
    $adjacent: Op.adjacent,
    $strictLeft: Op.strictLeft,
    $strictRight: Op.strictRight,
    $noExtendRight: Op.noExtendRight,
    $noExtendLeft: Op.noExtendLeft,
    $and: Op.and,
    $or: Op.or,
    $any: Op.any,
    $all: Op.all,
    $values: Op.values,
    $col: Op.col,
};

const sequelize = new Sequelize(config.DB!, config.USER!, config.PASSWORD!, {
  operatorsAliases:operatorsAliases,
  host: config.HOST!,
  dialect: "mysql",
  pool: {
    max: config.pool.max,
    min: config.pool.min,
    acquire: config.pool.acquire,
    idle: config.pool.idle,
  },
});

const db = {
  sequelize,
  user: userModel(sequelize, DataTypes),
  products: productModel(sequelize, DataTypes),
  userPaymentModel: userPaymentModel(sequelize, DataTypes),
  industries: industryModel(sequelize, DataTypes),
  userAddressModel: userAddressModel(sequelize, DataTypes),
  product_category: produtCategory(sequelize, DataTypes),
  admin: adminModel(sequelize, DataTypes),
};

/*=============================================
=            All table associations          =
=============================================*/

//products  association  here
db.products.belongsTo(db.admin, {
  foreignKey: "adminId",
  onDelete: "CASCADE",
});
db.admin.hasMany(db.products, {
  onDelete: "CASCADE",
});

db.products.hasMany(db.product_category, {
  foreignKey: "categoryId",
});

// user association here
db.user.hasOne(db.userAddressModel, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});
db.userPaymentModel.belongsTo(db.user, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

/*=====  End of All table associations======*/

/*=============================================
=             create tables           =
=============================================*/

const DB = async () => {
  try {
    await db.sequelize.sync({ force: false });
    console.log("Tables created successfully.");
  } catch (err: any) {
    console.error("Unable to create tables:", err.message);
  }
};

DB();

/*=====  End of  create tables ======*/

// send to the controllers and server

export { db, sequelize };
