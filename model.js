const config = require('../config');
const {Sequelize,DataTypes} = require('sequelize');

const sequelize=new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,{
        host:config.HOST,
        dialect:config.dialect,
        pool:{
            
        }
    }
)
