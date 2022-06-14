


const userAddressModel=(sequelise, datatypes)=>{
    return sequelise.define('userAddress',{
        id:{
            type:datatypes.UUID,
            primaryKey:true,
            defaultValue:datatypes.UUIDV1
        },
        address_line1:{
            type:datatypes.STRING,
            allowNull:false,
            validate:{
                customValidator:async(address_line1)=>{
                    if(!address_line1){
                        throw new Error("Please provide your address line 1")
                    }
                }
            }
        },
        address_line2:{
            type:datatypes.STRING,
            allowNull:false,
            validate:{
                customValidator:async(address_line2)=>{
                    if(!address_line2){
                        throw new Error("Please provide your address line 2")
                    }
                }
            }
        },
        city:{
            type:datatypes.STRING,
            allowNull:false,
            validate:{
                customValidator:async(city)=>{
                    if(!city){
                        throw new Error("Please provide your city")
                    }
                }
            }
        }
    })
}