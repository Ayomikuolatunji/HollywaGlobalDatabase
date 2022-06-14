const config = require('../controllers/dbConfig');
const {Sequelize,DataTypes} = require('sequelize');

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

sequelize.authenticate().then(()=>{
    console.log('Connection has been established successfully.');
})
.catch(err=>{
    console.error('Unable to connect to the database:',err.message);
})


const db={}


db.user=require('./user/user.model')(sequelize,DataTypes);
db.sequelize=sequelize;
db.Sequelize=Sequelize;



db.sequelize.sync({force:false}).then(()=>{
    console.log('Tables created successfully.');
})
.catch(err=>{
    console.error('Unable to create tables:',err.message);
})

// send to the controllers

module.exports={
    sequelize,
    db
}