


module.exports=(sequelise,datatypes)=>{
    const Post=sequelise.define('posts',{
        id:{
            type:datatypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        title:{
            type:datatypes.STRING,
            allowNull:false,
            validate:{
                notEmpty:{
                    msg:"Title is required"
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
    });

    return Post;
}