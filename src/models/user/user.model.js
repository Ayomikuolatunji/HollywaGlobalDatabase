
const {Sequelize} =require('sequelize');
const crypto = require("crypto");

const key = crypto.randomBytes(16).toString("hex");

const user=(sequelize,DataTypes)=>{
    return sequelize.define('user',{
        userId:{
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false,
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
                msg:"User already exists with this email" 
            }
        },
        first_name:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                customValidator:async(first_name)=>{
                    if(!first_name){
                        throw new Error("Please provide your first name")
                    }
                }
            }
        },
        last_name:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                customValidator:async(last_name)=>{
                    if(!last_name){
                        throw new Error("Please provide your last name")
                    }
                }
            }
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                customValidator:async(password)=>{
                    if(!password){
                        throw new Error("Please provide your password")
                    }
                }
            }
        },
        role:{
            type:DataTypes.STRING,
            allowNull:false,
           defaultValue:"customer",
        },
        user_profile_image:{
            type:DataTypes.STRING,
            allowNull:true,
            defaultValue:"https://res.cloudinary.com/dzqbzqgjy/image/upload/v1599098981/default_profile_image_qjqjqj.png"
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