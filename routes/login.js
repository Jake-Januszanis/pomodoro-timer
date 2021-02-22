const router = require('express').Router();
const User = require("../models/users");
const {loginValidation} = require("../validation");
const bcrypt = require('bcrypt');
const session = require('client-sessions');

router.post('/', async (req, res) => {

    //Verify data posted 
    const {error} = loginValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Search database for username
    const verifyUser = await User.findOne({ username: req.body.username});
    if (!verifyUser) return res.status(400).send("Invalid username")

    //Check to see if password matches
    const verifyPassword = await bcrypt.compare(req.body.password, verifyUser.password);
    if (!verifyPassword) return res.status(400).send("Invalid Password")

    //If username and password are correct then assign session
    try {
        req.session.user = verifyUser;
        res.redirect('/user/dashboard');
    } catch(err) {
        res.status(401).send(err.message);
    }
})
module.exports = router;

