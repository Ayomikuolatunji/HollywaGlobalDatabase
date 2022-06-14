

const user=(sequelize,DataTypes)=>{
    return sequelize.define('user',{
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:{
            type:DataTypes.STRING,
            allowNull:false
        },
        email:{
            type:DataTypes.STRING,
            allowNull:false,
            unique:true
        },
        password:{
            type:DataTypes.STRING,
            allowNull:false
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