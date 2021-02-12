
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const port = 4000;

const users = [];

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.sendFile("index.html")
})

app.post("/registerForm", async  (req, res) => {
    try {
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(req.body.password, salt);
    users.push({ username: req.body.username, password: hash});
    res.redirect("/");
    } catch {
        console.error();
    }
    console.log(users)
})

app.post("/loginForm", async (req, res) => {
    const user = users.find(user => user.username === req.body.username)
    if (user === null) {
        res.send("User not found");
    } try {
        if (await bcrypt.compare(req.body.password, user.password)) {
        console.log("Password Found")
        res.redirect("/")
        } else {
            res.send("Password not found")
        }
    } catch {
        res.send("There is an error");
    }
})


app.listen(port, () => {
    console.log('App is listening on port 4000')
})
