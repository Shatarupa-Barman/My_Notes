const express = require('express');
const app = express();
const port = 3000; // Replace with your desired port number

const db=require('./config/mongoose');

app.use('/', require('./routes'));
app.set('view engine', 'ejs');
app.set('views', './views');


app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    console.log("yippeee server is running");
});