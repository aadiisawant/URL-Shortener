const User = require("../models/users");
const {v4: uuidv4} = require('uuid');
// const { setUser } = require("../service/auth");
const bcrypt = require('bcryptjs')

async function handleUserSignUp(req,res){
    const {name, email, password} = req.body;
    const hashedPass = await bcrypt.hash(password, 10); //10 is the saltRounds

    await User.create({
        name,
        email,
        password : hashedPass,
        OriginalPass: password,
    })
    // return res.redirect("/") //2
    return res.status(201).json({ message : "user signup is success"})
}

async function handleUserLogin(req,res){
    const {email, password} = req.body;

    const user = await User.findOne({email})
    if(!user){//edited
        return res.status(404).json({message:"Email is not registered"})
    }
    const passMatch = await bcrypt.compare(password, user.password);
    if(!passMatch){
        // return res.render('login',{
        //     error :"Invalid Username or Password"
        // })
        return res.status(404).json({message:"Invalid Password"})
    }else{
        // const sessionId = uuidv4();
        // setUser(sessionId, user)
        // res.cookie('uid', sessionId)
        return res.status(200).send(user) // edit for frontend
    // return res.redirect("/")
    }
}


module.exports = {
    handleUserSignUp,
    handleUserLogin,
}