

const createUserPayment=async(req,res,next)=>{
    try{
        const userId=req.body.userId;
        const payment_type = req.body.payment_type;
        const card_number = req.body.card_number;
        const card_expiry_date = req.body.card_expiry_date;
        const card_cvv = req.body.card_cvv;
        const card_holder_name = req.body.card_holder_name;
        if(!userId){
            const error=new Error('User not found');
            error.statusCode=404;
            throw error;
        }
        const findUser=await db.userPaymentModel.findOne({
            where:{
                userId:userId
            }
        })
        if(findUser){
            const error=new Error('This card already exist on this user');
            error.statusCode=404;
            throw error;
        }
        const createUserPayment=await db.userPaymentModel.create({
                userId:userId,
                payment_type:payment_type,
                card_number:card_number,
                card_expiry_date:card_expiry_date,
                card_cvv:card_cvv,
                card_holder_name:card_holder_name
        })
        res.status(201).json({createUserPayment})
    }catch(error){
        if(!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

const updateUserPayment=async(req,res,next)=>{
    try{
        const userId=req.params.userId;
        const payment_type = req.body.payment_type;
        const card_number = req.body.card_number;
        const card_expiry_date = req.body.card_expiry_date;
        const card_cvv = req.body.card_cvv;
        const card_holder_name = req.body.card_holder_name;
        if(!userId){
            const error=new Error('User with provided not found or empty user id was provided');
            error.statusCode=404;
            throw error;
        }
        const updateUserCard=await db.userPaymentModel.update({
            payment_type:payment_type,
            card_number:card_number,
            card_expiry_date:card_expiry_date,
            card_cvv:card_cvv,
            card_holder_name:card_holder_name,
            userId:userId,
        },{
            where:{
                userId:userId
            }
        })
        res.status(201).json({
            updateUserCard,
            message:"card details updated successfully"
        })
    }catch(err){
        if(!err.statusCode){
            err.statusCode=422
        }
        next(err)
    }
}


module.exports={
    createUserPayment,
    updateUserPayment
}