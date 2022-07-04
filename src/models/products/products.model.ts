
const productModel=(sequelize: { define: (arg0: string, arg1: { id: { type: any; primaryKey: boolean; autoIncrement: boolean }; name: { type: any; allowNull: boolean; unique: boolean }; price: { type: any; allowNull: boolean }; description: { type: any; allowNull: boolean }; image: { type: any; allowNull: boolean }; createdAt: { type: any; allowNull: boolean; defaultValue: any }; updatedAt: { type: any; allowNull: boolean; defaultValue: any } }) => any },DataTypes: { INTEGER: any; STRING: any; DATE: any; NOW: any })=>{
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


// associate the models here

export default productModel;


