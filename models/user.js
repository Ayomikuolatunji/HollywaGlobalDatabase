

module.exports=(sequelize,datatypes)=>{
    const user=sequelize.define('',{
        id:{
            type:datatypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:datatypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:{
                    msg:"Name is required"
                }
            }
        },
        email:{
            type:datatypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:{
                    msg:"Email is required"
                }
            }
        },
        password:{
            type:datatypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:{
                    msg:"Password is required"
                }
            }
        },
        createdAt:{
            type:datatypes.DATE,
            allowNull:false,
            defaultValue:datatypes.NOW
        },
        updatedAt:{
            type:datatypes.DATE,
            allowNull:false,
            defaultValue:datatypes.NOW
        } 
    })

    return user;
}