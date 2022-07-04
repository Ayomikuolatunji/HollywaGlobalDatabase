

const adminType = (sequelize, DataTypes) => {
    return sequelize.define('admin_type', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        }
    })
}