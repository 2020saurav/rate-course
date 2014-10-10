//dependencies
var express = require('express');
var routes = require('./routes');
var http = require('http');
var path = require('path');

var connection  = require('express-myconnection');
var mysql = require('mysql');

var app = express();

//db
app.use(
    
    connection(mysql,{
        host     : 'localhost',
        user     : 'root',
        password : 'root',
        database : 'test',
        debug    : false 
    },'request')

);

//environments
app.set('port', process.env.PORT||3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

//routes
app.get('/', routes.index);


// server creation
http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});