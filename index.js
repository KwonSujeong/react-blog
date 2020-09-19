const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://sj:1234@cluster0.eb8lh.mongodb.net/test?retryWrites=true&w=majority',
    { useNewUrlParser: true }).then(() => console.log('DB connected'))
    .catch(err => console.error(err));

app.get('/', (req, res) => {
    res.send('hello world')
});



app.listen(5000);