
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('client-sessions')
const mongoose = require('mongoose')
require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({
    cookieName: 'session',
    secret: process.env.SECRET,
    duration: 30 * 60 * 100,
    activeDuration: 5 * 60 * 1000
}));
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
app.use(express.json());

//Connect to DB
const db = mongoose.connect(process.env.DB_CONNECT,
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

app.get('/user/dashboard', (req, res) => {
    res.render('dashboard')
})

app.listen(4000, () => {
    console.log('App is listening on port 4000')
})
