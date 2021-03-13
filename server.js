
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('client-sessions')
const mongoose = require('mongoose')
require('dotenv').config();
const port = process.env.PORT;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    cookieName: 'session',
    secret: process.env.SECRET,
    duration: 4 * 60 * 60 * 1000,
    activeDuration: 5 * 60 * 1000
}));
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));

//Connect to DB
const db = mongoose.connect(process.env.DB_CONNECT || DB_CONNECT,
    {useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
},
    () => console.log('Connected to Database'));


//Routes
const registerRoute = require("./routes/register");
const loginRoute = require('./routes/login')
const dashboardRoute = require('./routes/dashboard');
app.use("/register", registerRoute);
app.use('/login', loginRoute);
app.use('/user/dashboard', dashboardRoute);


app.get("/", (req, res) => {
    res.render('index')
})

app.get('/login', (req, res) => {
    res.render("login");
})

app.get('/register', (req, res) => {
    res.render('register')
})


app.listen(port, () => {
    console.log(`App is listening on port ${port}`)
})
