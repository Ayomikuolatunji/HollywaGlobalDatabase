import { Sequelize, DataTypes, Dialect } from "sequelize";
import { SequelizeTypescriptMigration } from "sequelize-typescript-migration";

import config from "../database/dbConfig";
import userModel from "./user/user.model";
import productModel from "./products/products.model";
import userPaymentModel from "./user/payment.model";
import industryModel from "./industries/industry.model";
import userAddressModel from "./user/userAddress.model";
import produtCategory from "./products/product_category.model";
import adminModel from "./admin/admin.model";
import productsDepartments from "./products/productsDepartment.model";
import path, { join } from "path";
import productCart from "./cart/cart.model";

const sequelize: any = new Sequelize(
  config.DB!,
  config.USER!,
  config.PASSWORD!,
  {
    host: config.HOST!,
    dialect: "mysql",
    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle,
    },
  }
);

const db = {
  sequelize,
  user: userModel(sequelize, DataTypes),
  userPaymentModel: userPaymentModel(sequelize, DataTypes),
  products: productModel(sequelize, DataTypes),
  produtDepartments: productsDepartments(sequelize, DataTypes),
  product_category: produtCategory(sequelize, DataTypes),
  industries: industryModel(sequelize, DataTypes),
  userAddressModel: userAddressModel(sequelize, DataTypes),
  admin: adminModel(sequelize, DataTypes),
  productCart: productCart(sequelize, DataTypes),
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

db.produtDepartments.belongsTo(db.admin, {
  foreignKey: "adminId",
  onDelete: "CASCADE",
});



// all product cart assoc
db.productCart.belongsTo(db.user, {
  foreignKey: "userId",
  onDelete: "CASCADE",
});

// payment
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
    await db.sequelize.sync({ force: true });
    console.log("Tables created successfully.");
    // await SequelizeTypescriptMigration.makeMigration(sequelize, {
    //   outDir: path.join(__dirname, "../../db/migrations"),
    //   migrationName: "add-d",
    //   preview: false,
    // });
  } catch (err: any) {
    console.error("Unable to create tables:", err.message);
  }
};

DB();

/*=====  End of  create tables ======*/

// send to the controllers and server

export { db, sequelize };