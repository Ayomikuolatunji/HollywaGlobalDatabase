const moment = require('moment');  


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
                        }else if(payment_type!=='credit'&&payment_type!=='debit'){
                            throw new Error("Please provide valid payment type")
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
                        }else if(!moment(card_expiry_date).isValid()){
                            throw new Error("Please provide a valid card expiry date")
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
                        }else if(card_cvv.length!==3){
                            throw new Error("Please provide your card cvv with 3 digits")
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