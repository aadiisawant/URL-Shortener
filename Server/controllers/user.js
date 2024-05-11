const User = require("../models/users");
const {v4: uuidv4} = require('uuid');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const secret = "aditya0162"
async function handleUserSignUp(req,res){
    const {name, email, password} = req.body;
    const hashedPass = await bcrypt.hash(password, 10); //10 is the saltRounds
    try{
    await User.create({
        name,
        email,
        password : hashedPass,
        OriginalPass: password,
    })
    const user = await User.findOne({email})
    if(user){
        return res.status(201).send(user)
    }else{
        return res.status(500).json({ message : "user data not found"})
    }

    }catch(err){
        return res.status(404).json({message : "Error creating user"})
    }
    
}

async function handleUserLogin(req,res){
    const {email, password} = req.body;

    const user = await User.findOne({email})
    if(!user){
        return res.status(404).json({message:"Email is not registered"})
    }
    const passMatch = await bcrypt.compare(password, user.password);
    if(!passMatch){
        return res.status(404).json({message:"Invalid Password"})
    }else{
        const token = jwt.sign({userId: user._id }, secret, {expiresIn : '1h'}) 
        return res.status(200).json({user: user, token: token})
    }
}


module.exports = {
    handleUserSignUp,
    handleUserLogin,
}