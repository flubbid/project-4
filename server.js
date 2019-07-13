const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

require('dotenv').config();


app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(favicon(path.join(__dirname, 'build', 'favicon.ico')));
app.use(express.static(path.join(__dirname, 'build')));
app.use('/api/users', require('./backend/routes/api/user'))

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true})

const connection = mongoose.connection;

connection.once('open', () => {
    console.log('MongoDB connected');
})
//Put any API routes here before the "catch all" route!

app.get('/*', function(req,res){
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

const port = process.env.PORT || 3001;

app.listen(port, function(){
    console.log(`Express ap running on port ${port}`)
})