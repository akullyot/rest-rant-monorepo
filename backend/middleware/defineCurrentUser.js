const db = require("../models")
const jwt = require('json-web-token')

const { User } = db;

async function defineCurrentUser(req, res, next){
    try {
        const [ method, token ] = req.headers.authorization.split(' ')
        if(method == 'Bearer'){
            const result = await jwt.decode(process.env.JWT_SECRET, token)
            const { id } = result.value
            let user = await User.findOne({ 
                where: {
                    userId: id
                }
            })
            console.log(user);
            req.currentUser = user
        }
        next()
    } catch(err){
        console.log(err)
        req.currentUser = null
        next() 
    }
}

module.exports = defineCurrentUser
