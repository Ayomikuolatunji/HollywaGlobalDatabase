

const adminType = (sequelize:any, DataTypes:any) => {
    return sequelize.define('admin_type', {
        id: {
            type: DataTypes.UUID,
            primaryKey: true,
        }
    })
}

export default adminType