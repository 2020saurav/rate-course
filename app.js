//dependencies
var express = require('express');
var routes = require('./routes');
var model = require('./models/index');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();
//environments

app.set('port', process.env.PORT||3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

//routes

app.get('/', routes.index);                             // app home
app.get('/contact', routes.contact);                    // contact
app.get('/course/', routes.courses);                    // list all courses
app.get('/course/:id/', function(req,res) {               // selected course
    routes.course(req,res)
});
app.get('/course/:id/:offeringId/', function(req,res) {   // selected offering
    routes.courseOffering(req,res)
});

app.get('/admin/', function(req,res) {                    // admin home
    routes.admin(req,res)
});
app.get('/admin/:model', function(req,res) {              // complete model object
    routes.adminModelViewAll(req,res)
});
app.get('/admin/:model/create', function(req,res) {      // GET create record in model
    routes.adminModelCreate(req,res)
});
app.post('/admin/:model/create', function(req,res) {     // POST create record in model
    routes.adminModelCreatePost(req,res)
});
app.get('/admin/:model/view/:id', function(req,res) {     // view a record
    routes.adminModelView(req,res)
});
app.get('/admin/:model/update/:id', function(req,res) {   // GET update a record
    routes.adminModelUpdate(req,res)
});
app.post('/admin/:model/update/:id', function(req,res) {   // POST update a record
    routes.adminModelUpdatePost(req,res)
});
app.get('/admin/:model/delete/:id', function(req,res) {   // delete a record
    res.send("Delete is not enabled. Please contact developers :P")
});

// server creation

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});