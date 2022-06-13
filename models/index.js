const config = require('../config');
const {Sequelize,DataTypes} = require('sequelize');

const sequelize=new Sequelize(
    config.DB,
    config.USER,
    config.PASSWORD,{
        host:config.HOST,
        dialect:config.dialect,
        operatorsAliases:false,
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

db.sequelize=sequelize;
db.Sequelize=Sequelize;


db.posts=require('./posts')(sequelize,DataTypes);
db.user=require('./user')(sequelize,DataTypes);


db.sequelize.sync({force:false}).then(()=>{
    console.log('Tables created successfully.');
})
.catch(err=>{
    console.error('Unable to create tables:',err.message);
})


module.exports=db;