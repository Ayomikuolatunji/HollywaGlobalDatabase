const config = require('../database/dbConfig');
const {Sequelize,DataTypes} = require('sequelize');
const user = require('./user/user.model');
const productModel = require('./products/products.model');

 const sequelize=new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,{
        host:config.HOST,
        dialect:config.dialect,
        pool:{
            max:config.pool.max,
            min:config.pool.min,
            acquire:config.pool.acquire,
            idle:config.pool.idle
        }
    }
)



const db={}

// defind all the models here
db.user=require('./user/user.model')(sequelize,DataTypes);
db.products=require('./products/products.model')(sequelize,DataTypes);
db.industries=require('./industries/industry.model')(sequelize,DataTypes);
db.admin=require('./admin/admin.model')(sequelize,DataTypes);

// initialize the database
db.sequelize=sequelize;
db.Sequelize=Sequelize;

// associate the models here
db.products.belongsTo(db.admin,{
    foreignKey:'adminId',
    onDelete:'CASCADE',
})

db.admin.hasMany(db.admin,{
    onDelete:"CASCADE"
})



const DB=async()=>{
    try {
        await db.sequelize.sync({force:false})  
        console.log('Tables created successfully.');
      } catch (err) {
          console.error('Unable to create tables:',err.message);
      }
}

DB()


// send to the controllers

module.exports={
    sequelize,
    db
}