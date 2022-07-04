"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = exports.db = void 0;
const dbConfig_1 = __importDefault(require("../database/dbConfig"));
const sequelize_1 = require("sequelize");
const sequelize = new sequelize_1.Sequelize(dbConfig_1.default.DB, dbConfig_1.default.USER, dbConfig_1.default.PASSWORD, {
    host: dbConfig_1.default.HOST,
    dialect: "mysql",
    pool: {
        max: dbConfig_1.default.pool.max,
        min: dbConfig_1.default.pool.min,
        acquire: dbConfig_1.default.pool.acquire,
        idle: dbConfig_1.default.pool.idle
    }
});
exports.sequelize = sequelize;
const db = {};
exports.db = db;
/*=============================================
=            all models          =
=============================================*/
// defind all the models here
db.user = require('./user/user.model')(sequelize, sequelize_1.DataTypes);
db.products = require('./products/products.model')(sequelize, sequelize_1.DataTypes);
db.industries = require('./industries/industry.model')(sequelize, sequelize_1.DataTypes);
db.admin = require('./admin/admin.model')(sequelize, sequelize_1.DataTypes);
db.userAddressModel = require('./user/userAddress.model')(sequelize, sequelize_1.DataTypes);
db.userPaymentModel = require('./user/payment.model')(sequelize, sequelize_1.DataTypes);
db.product_category = require('./products/product_category.model')(sequelize, sequelize_1.DataTypes);
/*=====  End of all models======*/
// initialize the database
db.sequelize = sequelize;
db.Sequelize = sequelize_1.Sequelize;
/*=============================================
=            All table associations          =
=============================================*/
//products  association  here
db.products.belongsTo(db.admin, {
    foreignKey: 'adminId',
    onDelete: 'CASCADE',
});
db.admin.hasMany(db.products, {
    onDelete: "CASCADE"
});
db.products.hasMany(db.product_category, {
    foreignKey: 'categoryId',
});
// user association here
db.user.hasOne(db.userAddressModel, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
db.userPaymentModel.belongsTo(db.user, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
/*=====  End of All table associations======*/
/*=============================================
=             create tables           =
=============================================*/
const DB = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db.sequelize.sync({ force: false });
        console.log('Tables created successfully.');
    }
    catch (err) {
        console.error('Unable to create tables:', err.message);
    }
});
DB();
