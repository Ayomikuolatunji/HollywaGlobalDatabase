
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
            unique:true,
            validate:{
                customValidator:async(email)=>{
                    if(!email){
                        throw new Error("Please provide your email")
                    }
                    const user=await db.user.findOne({
                        where:{
                            email:email
                        }
                    })
                    if(user){
                        const error=new Error("User created successfully");
                        error.statusCode=201;
                        throw new Error("Email already exist")
                    }
                },
                
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