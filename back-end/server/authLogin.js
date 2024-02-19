const { getUsername } = require('../databases/dbUsers')

async function auth (req,res,next) {
    console.log(req.headers.auth);
    try {
        if (req.headers.auth) {
            const [name, username ] = req.headers.auth.split(":")
            const user = await getUsername(name, username);
            if (!user) {
                res.status(404).send("user not found")
                return;
            }
            req.user = user;
            next()
        } else {
            res.status(401).send();

        }
    } catch (error) {
        res.status(500).send();
    }
}
module.exports = auth 