const { response } = require("express");
const User = require("../models/user");


const getUser = async (req, res = response) =>{

    // const since = Number(req.query.since) || 0; 

    const users = await User
        .find({_id: {$ne: req.uid}}) //busca todos los usuarios menos el propio 
        .sort('-online')
        // .skip(since)
        .limit(10) //paginacion

    res.json({
        ok: true,
        users: users
    })
}


module.exports = {
    getUser
}