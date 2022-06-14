

const productModel=(sequelize,DataTypes)=>{

    return sequelize.define("products",{
         id:{
                type:DataTypes.INTEGER,
                primaryKey:true,
                autoIncrement:true
         },
        name:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        price:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false
        },
        image:{
            type:DataTypes.STRING,
            allowNull:false
        },
        industryId:{
            type:DataTypes.INTEGER,
            allowNull:false
        },
        createdAt:{
            type:DataTypes.DATE,
            allowNull:false,
            defaultValue:DataTypes.NOW
        },
        updatedAt:{
            type:DataTypes.DATE,
            allowNull:false,
            defaultValue:DataTypes.NOW
        }
    })
}


module.exports=productModel