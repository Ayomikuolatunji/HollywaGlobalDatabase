

const {Sequelize, DataTypes} = require('sequelize');

const sequelize=require('../sequelize');


const Product = sequelize.define('product',{
    id:{
           type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    price:{
        type:DataTypes.DECIMAL(10,2),
        allowNull:false,
        validate:{
            notEmpty:true,
            isDecimal:true
        }
    },
    description:{
        type:DataTypes.STRING,
        allowNull:false,
        validate:{
            notEmpty:true
        }
    },
    createdAt:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW
    },
    updatedAt:{
        type:DataTypes.DATE,
        allowNull:false,
        defaultValue:DataTypes.NOW
    }
})