const User = require('../models/user');


exports.getUserById = (req,res,next,id) => { 
    User.findById(id).exec((err,user)=>{
       if(err || !user){

        return res.status(400).json({
            error:"No User was found in DB"
        })

       }

       req.profile = user;
       next();
    })
}

exports.getUser = (req,res) =>{
    
    req.profile.salt = undefined;
    req.profile.encry_passsword = undefined;
    return res.json(req.profile);
}

exports.updateUser = (req,res) =>{
    User.findByIdAndUpdate(
        
       { _id : req.profile._id},
       {$set:req.body},
       {new:true,useFindAndModify:false},
       (err,user)=>{
           if(err){
               return res.status(400).json({
                   error:"You are not authorized to update this user"
               })
           }
           user.salt = undefined;
           user.encry_passsword = undefined;
           res.json(user)
       }
    )
}


