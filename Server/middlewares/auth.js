// const { getUser } = require("../service/auth");

// async function restrictToLoggedinUserOnly(req,res, next){
//     const userUid = req.cookies.uid;
//     if(!userUid) return res.redirect('/login');
    
//     const user = getUser(userUid);
    
//     if(!user) return res.redirect('/login');
    
//     req.user = user; //at the time of url shortner it is used to get user._id ( controller/user.js) 
//     next();

// }

// async function checkAuth(req,res, next){
//     const userUid = req.cookies.uid;
//     const user =getUser(userUid);
//     // if(!user) return res.redirect('/login');
//     req.user = user; 
//     next();
// }

// module.exports = {
//     restrictToLoggedinUserOnly,
//     checkAuth
// }