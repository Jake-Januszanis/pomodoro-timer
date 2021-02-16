
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const dotenv = require('dotenv');
dotenv.config();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.json());

//Connect to DB
mongoose.connect(process.env.DB_CONNECT,
    {useNewUrlParser: true,
    useUnifiedTopology: true},
    () => console.log('Connected to Database'));


//Routes
const registerRoute = require("./routes/register");
const loginRoute = require('./routes/login')
app.use("/register", registerRoute);
app.use('/login', loginRoute);


app.get("/", (req, res) => {
    res.sendFile("index.html")
})

app.listen(4000, () => {
    console.log('App is listening on port 4000')
})
