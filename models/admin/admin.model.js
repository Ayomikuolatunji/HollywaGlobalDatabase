const {Sequelize} = require('sequelize');


const adminModel = (sequelise, Datatypes)=>{
    const Admin = sequelise.define('admin', {
        id: {
            type: Datatypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Datatypes.STRING,
            allowNull: false,
            unique: true,
        },
        email: {
            type: Datatypes.STRING,
            allowNull: false,
            unique: true,
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


module.exports = adminModel;