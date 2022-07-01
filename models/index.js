const config = require('../database/dbConfig');
const { Sequelize, DataTypes } = require('sequelize');


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


/*=============================================
=            all models          =
=============================================*/

// defind all the models here
db.user=require('./user/user.model')(sequelize,DataTypes);

db.products=require('./products/products.model')(sequelize,DataTypes);

db.industries=require('./industries/industry.model')(sequelize,DataTypes);

db.admin=require('./admin/admin.model')(sequelize,DataTypes);

db.userAddressModel=require('./user/userAddress.model')(sequelize,DataTypes);

db.userPaymentModel=require('./user/payment.model')(sequelize,DataTypes);
db.product_category=require('./products/product_category.model')(sequelize,DataTypes);


/*=====  End of all models======*/




// initialize the database
db.sequelize=sequelize;
db.Sequelize=Sequelize;


/*=============================================
=            All table associations          =
=============================================*/


//products  association  here
db.products.belongsTo(db.admin,{
    foreignKey:'adminId',
    onDelete:'CASCADE',
})
db.admin.hasMany(db.products,{
    onDelete:"CASCADE"
})

db.products.hasMany(db.product_category,{
    foreignKey:'categoryId',
})

// user association here
db.user.hasOne(db.userAddressModel,{
    foreignKey:'userId',
    onDelete:'CASCADE'
})
db.userPaymentModel.belongsTo(db.user,{
    foreignKey:'userId',
    onDelete:'CASCADE'
})



/*=====  End of All table associations======*/






/*=============================================
=             create tables           =
=============================================*/
const DB=async()=>{
    try {
        await db.sequelize.sync({force:false})  
        console.log('Tables created successfully.');
      } catch (err) {
          console.error('Unable to create tables:',err.message);
      }
}

DB()


/*=====  End of  create tables ======*/




// send to the controllers and server

module.exports={
    sequelize,
    db
}