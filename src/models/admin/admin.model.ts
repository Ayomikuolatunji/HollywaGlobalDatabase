const {Sequelize} = require('sequelize');


const adminModel = (sequelise:any, Datatypes:any)=>{
    const Admin = sequelise.define('admin', {
        id: {
            type: Sequelize.UUID,
            primaryKey: true,
            defaultValue: Sequelize.UUIDV1
        },
        username: {
            type: Datatypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: Datatypes.STRING,
            allowNull: false,
            unique: {
                args: true,
                msg: "Admin already exists with this email"
            },
            validate: {
               customValidator: async (email:string)=>{
                     if(!email){
                          throw new Error("Please provide your email")
                     }
               }
            }
        },
        password: {
            type: Datatypes.STRING,
            allowNull: false,
        },
        createdAt:{
            type:Datatypes.DATE,
            allowNull:false,
            defaultValue:Datatypes.NOW
        },
        updatedAt:{
            type:Datatypes.DATE,
            allowNull:false,
            defaultValue:Datatypes.NOW
        }
    })

    return Admin;
}


export  default adminModel;