// const { getUsers } = require('../database/dbUsers')
const jwt = require("jsonwebtoken")
async function authenticationToken(req, res, next) {
    console.log("authenticationToken");
    try {
        const token = req.headers['auth']
        console.log(token);
        // const token = authHeader && authHeader.split(' ')[1]
        if (token === null) return res.send('on authHeader')

        jwt.verify(token, process.env.Secret, (err, user) => {
            if (err) return res.send('on token')
            req.user = user
        console.log(user.name);
            next()
        })
    } catch (error) {
    
        res.send("Incorrect authentication");
    }
}

module.exports = {authenticationToken }