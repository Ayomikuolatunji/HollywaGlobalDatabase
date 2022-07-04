


const produtCategory=(sequelize:any, DataTypes:any) => {
    return sequelize.define('product_category', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        description:{
            type:DataTypes.STRING,
            allowNull:false

        },
        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,
        }
    })
}

export default  produtCategory;