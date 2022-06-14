

const UserPaymentModel=(sequelize,datatypes)=>{
     return sequelize.define("userPayment",{
            id:{
                type:datatypes.UUID,
                primaryKey:true,
                defaultValue:datatypes.UUIDV1
            },
            payment_type:{
                type:datatypes.STRING,
                allowNull:false,
                validate:{
                    customValidator:async(payment_type)=>{
                        if(!payment_type){
                            throw new Error("Please provide your payment type")
                        }
                    }
                }
            },
            card_number:{
                type:datatypes.STRING,
                allowNull:false,
                validate:{
                    customValidator:async(card_number)=>{
                        if(!card_number){
                            throw new Error("Please provide your card number")
                        }
                    }
                }
            },
            card_expiry_date:{
                type:datatypes.STRING,
                allowNull:false,
                validate:{
                    customValidator:async(card_expiry_date)=>{
                        if(!card_expiry_date){
                            throw new Error("Please provide your card expiry date")
                        }
                    }
                }
            },
            card_cvv:{
                type:datatypes.STRING,
                allowNull:false,
                validate:{
                    customValidator:async(card_cvv)=>{
                        if(!card_cvv){
                            throw new Error("Please provide your card cvv")
                        }
                    }
                }
            },
            card_holder_name:{
                type:datatypes.STRING,
                allowNull:false,
                validate:{
                    customValidator:async(card_holder_name)=>{
                        if(!card_holder_name){
                            throw new Error("Please provide your card holder name")
                        }
                    }
                }
            },
            created_at:{
                type:datatypes.DATE,
                allowNull:false,
                defaultValue:datatypes.NOW
            },
            updated_at:{
                type:datatypes.DATE,
                allowNull:false,
                defaultValue:datatypes.NOW
            }
     })
}


module.exports=UserPaymentModel