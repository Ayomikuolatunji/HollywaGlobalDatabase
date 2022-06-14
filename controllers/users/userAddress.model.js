


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
        },
        postal_code:{
            type:datatypes.STRING,
            allowNull:false,
            validate:{
                customValidator:async(postal_code)=>{
                    if(!postal_code){
                        throw new Error("Please provide your postal code")
                    }
                }
            }
        },
        country:{
            type:datatypes.STRING,
            allowNull:false,
            validate:{
                customValidator:async(country)=>{
                    if(!country){
                        throw new Error("Please provide your country")
                    }
                }
            }
        },
        telephone:{
            type:datatypes.STRING,
            allowNull:false,
            validate:{
                customValidator:async(telephone)=>{
                    if(!telephone){
                        throw new Error("Please provide your telephone")
                    }
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
}