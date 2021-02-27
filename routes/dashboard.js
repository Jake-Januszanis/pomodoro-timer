const router = require('express').Router();
const bodyParser = require('body-parser');
const User = require('../models/users');
const mongoose = require('mongoose');

router.get('/', (req, res) => {
    //Update last login
    User.findOneAndUpdate({username: req.session.user.username}, {lastLogin: new Date()}, {upsert: true, new: true}, function(err, result) {
        if (err) {
              res.send(err)
            } else {
                res.render("dashboard", {user: result})
            }
    })
})
    router.post("/", async (req, res) => {

        //Search DB for logged in user
        const activeUser = await User.findOne({_id: req.session.user._id});
        if (!activeUser) res.status(404).send('User info not found');
            
       // Compare current date with DB date to either save or update current studyTime

       //***Retrieve last saved object from studyTime collection */
       const lastSavedSession = await activeUser.studyTime.pop();

       //**Get date from last saved session for activeUser*/
        const lastSavedDate = await lastSavedSession.date;
        const lastSavedMonth = await lastSavedDate.getMonth() + 1;
        const lastSavedDay = await lastSavedDate.getDate();
        const lastSavedFullDate = `${lastSavedMonth}/${lastSavedDay}`;

        //**Current Date */
        let currentMonth = new Date().getMonth() + 1;
        let currentDay = new Date().getDate();
        let currentFullDate = `${currentMonth}/${currentDay}`;

        //**Compare dates. A) If date matches update time. B) If date doesnt match create new object
        if (lastSavedFullDate === currentFullDate) {
            const updatedStudyTime = {date: new Date(), time: lastSavedSession.time + (req.body.count * 25)};
            activeUser.studyTime.push(updatedStudyTime);
            activeUser.save();
        } else {
            const currentSession = {date: new Date(), time: req.body.count * 25};
            activeUser.studyTime.push(lastSavedSession)
            activeUser.studyTime.push(currentSession);
            activeUser.save();
            console.log("Database updated");

        }


    })
module.exports = router;