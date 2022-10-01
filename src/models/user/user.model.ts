
import Sequelize  from 'sequelize';


const userModel=(sequelize: Sequelize.Sequelize,DataTypes: typeof import("sequelize/types/data-types"))=>{
    return sequelize.define('users',{
        userId:{
            type: Sequelize.UUID,
            defaultValue: Sequelize.UUIDV1,
            primaryKey: true
        },
        username:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                customValidator:(name:any)=>{
                    if(!name.length){  
                        const error:any = new Error('Name is required');
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
                customValidator:async(email: any)=>{
                    if(!email){
                        throw new Error("Please provide your email")
                    }
                }
            },
            unique:{
                name:'email already exits',
                msg:"User already exists with this email" 
            }
        },
        first_name:{
            type:DataTypes.STRING,
            allowNull:false,
            validate:{
                customValidator:async(first_name: any)=>{
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
                customValidator:async(last_name: any)=>{
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
                customValidator:async(password: any)=>{
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
        
export default userModel;