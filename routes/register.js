const router = require('express').Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const {registerValidation} = require('../validation')

router.post('/', async (req, res) => {

    //Validate the data being sent
    const {error} = registerValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    //Check to see if username already exists
    const verifyUsername = await User.findOne({ username: req.body.username });
    if (verifyUsername) return res.status(400).send("Username is already taken. Please choose another")

    //Hash Password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    //Save data to Database
    const user = new User({
        name: req.body.name,
        username: req.body.username,
        password: hashedPassword,
        studyTime: [{
            date: new Date(),
            time: 0
        }]
    })

    try {
        const newUser = await user.save()
        res.redirect('/')
    } catch(error) {
        res.status(400).send(error);
    }
})


module.exports = router;