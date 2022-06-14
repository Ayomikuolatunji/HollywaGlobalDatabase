
const bcrypt = require('bcrypt')
const { db } =require("../index")


const user=(sequelize,DataTypes)=>{
    return sequelize.define('user',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:true,
            validate:{
                customValidator:(name)=>{
                    if(!name.length){  
                        const error = new Error('Name is required');
                          error.statusCode=422;             
                          throw error;
                     }
                }
            }
        },
        email:{
            type:DataTypes.STRING,
            allowNull:true,
            validate:{
                customValidator:async(email)=>{
                    if(!email){
                        throw new Error("Please provide your email")
                    }
                },
                isEmail:true
            },
            unique:{
                args:true,
                msg:"Email already exists" 
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
        },
        createdAt:{
            type:DataTypes.DATE,
            allowNull:false
        },
        updatedAt:{
            type:DataTypes.DATE,
            allowNull:false
        }
    })
}
        
module.exports=user;