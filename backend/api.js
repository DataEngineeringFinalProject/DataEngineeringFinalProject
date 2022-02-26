const express = require('express')
const request = require('request');

app = express();
const PORT = 3000;

app.get('/home', function(req, res) {
    request('http://172.27.0.3:5000/', function (error, response, body) {
        console.error('error:', error); 
        console.log('statusCode:', response && response.statusCode); 
        console.log('body:', body); 
        res.send(body); 
      });      
});
app.post()  