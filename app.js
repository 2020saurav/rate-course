//dependencies
var express = require('express');
var routes = require('./routes');
var model = require('./models/index');
var http = require('http');
var path = require('path');

var app = express();

//environments
app.set('port', process.env.PORT||3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


app.use(express.static(path.join(__dirname, 'public')));

//routes
app.get('/', routes.index); // app home

app.get('/course/', routes.courses); // list all courses

app.get('/course/:id/',function(req,res){
    routes.course(req,res)
}) // details of selected course

app.get('/course/:id/:offeringId/',function(req,res){
    routes.courseOffering(req,res)
})// details of selected course offering

app.get('/admin/',function(req,res){
    routes.admin(req,res)
}) // admin Home

app.get('/admin/:model',function(req,res){
    routes.adminModelViewAll(req,res)
})  //View all list

app.get('/admin/:model/create', function(req,res){
    routes.adminModelCreate(req,res)
})
app.post('/admin/:model/create', function(req,res){
    routes.adminModelCreatePost(req,res)
})

app.get('/admin/:model/view/:id',function(req,res){
    routes.adminModelView(req,res)
})

app.get('/admin/:model/update/:id',function(req,res){
    routes.adminModelUpdate(req,res)
})

app.get('/admin/:model/delete/:id',function(req,res){
    routes.adminModelDelete(req,res)
})


app.get('/contact', routes.contact)

// server creation
http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});