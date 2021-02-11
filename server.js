const { Console } = require('console');
const express = require('express');
const app = express();
const port = 4000;

app.use(express.static(__dirname + '/public'));

app.get("/", (req, res) => {
    res.sendFile("index.html")
})


app.listen(port, () => {
    console.log('App is listening on port 4000')
})
