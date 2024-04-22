const shortid = require('shortid')
const URL = require('../models/url')

async function handleGenerateNewShortURL(req,res){
    const body = req.body;
    if(!body.url) return res.status(400).json({
        error: "URL is required"
    })
    const shortID = shortid(8);
    await URL.create({
        shortID : shortID,
        redirectURL : body.url,
        vistHistory : [],
        createdBy: body.id // this id comes from middleware auth.js
    });
    const urls = await URL.find({createdBy: body.id})
    //for frontend
    
    return res.status(201).send(urls)
    //For ejs templete
    // return res.render('home',{
    //     id : shortID,
    //     urls: await URL.find({createdBy:req.user._id}),

    // })
    // return res.status(201).json({id : shortID})
}

async function handleGetUserUrls(req,res){
    const id = req.params._id;
    const urls = await URL.find({createdBy:id})
    if(!urls){
        res.status(404).json({message:"URLs not found"})
    }else{
        res.status(200).send(urls);
    }

}

async function handleGetAnalytics(req,res){
    const shortID = req.params.shortId
    const result = await URL.findOne({ shortID});
    res.json({
        TotalClicks: result.vistHistory.length,
        Analytics : result.vistHistory
    })
}

async function handleRedirectByShortID(req,res){
    const shortID = req.params.shortId;
    const entry = await URL.findOneAndUpdate({
        shortID
    }, 
    {
        $push :{
            vistHistory : {
                timestamp: Date.now(),
            }
        }
    })
    res.redirect(entry.redirectURL);
}

module.exports = {
    handleGenerateNewShortURL,
    handleGetAnalytics,
    handleRedirectByShortID,
    handleGetUserUrls
}