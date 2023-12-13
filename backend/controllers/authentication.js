const router = require('express').Router()
const db = require("../models")
const bcrypt = require('bcrypt')

const { User } = db

router.post('/', async (req, res) => {
    
    let user = await User.findOne({
        where: { email: req.body.email }
    });
    if (!user || !await bcrypt.compare(req.body.password, user.passwordDigest)) {
        res.status(404).json({ 
            message: `Could not find a user with the provided username and password` 
        })
    } else {
        //Set this user into your session
        req.session.userId = user.userId;
        res.json({ user })
    }
});

//Purpose: return the currently logged in user
router.get('/profile', async(req,res) => {
    try {
        let user = await User.findOne({
            where: {
                userId: req.session.userId
            }
        });
        console.log(user)
        res.json(user)
    } catch (error) {
        //send over nothing
        res.json(null);
    }
});



module.exports = router
