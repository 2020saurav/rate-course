//dependencies
var express = require('express');
var routes = require('./routes');
var model = require('./models/index');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();
//environments

app.set('port', process.env.PORT||3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));

app.use(session({
    secret: 'cookieKaSecret',
    name: 'cookieKaNaam',
    resave: true,
    saveUninitialized: true
}));

var sess;

//routes

app.get('/', routes.index);                             // app home
app.get('/contact/', routes.contact);                    // contact
app.get('/course/', routes.courses);                    // list all courses
app.get('/course/:id/', function(req,res) {               // selected course
    routes.course(req,res)
});
app.get('/course/:id/:offeringId/', function(req,res) {   // selected offering
    routes.courseOffering(req,res);
});
app.get('/courses/dept/:dept/', function(req, res) {
    routes.coursesDept(req,res);
});

//app.get('/profile/update/', function(req, res) {
//    routes.profileUpdate(req, res)
//});

app.get('/course/:id/:offeringId/rate/', function(req,res) {   // selected offering rating : user needs to be logged in
    if(req.session.user)
        routes.courseOfferingRate(req,res);
    else
        routes.loginBackToCourse(req,res);
});

app.get('/user/:id/', function(req,res) {
    routes.user(req,res);
});
app.get('/login/', function(req,res) {
    res.render('login',{"session":req.session ,"returnURL":"/"});
})
app.post('/login/', function(req,res) {                     //login POST
   routes.loginPost(req,res);
});
app.get('/logout/', function(req,res) {                     // logout
    req.session.destroy(function(err){
        if(err)
            console.log(err);
        else
            res.redirect('/');
    })
});

app.get('/professor/', function(req,res) {
    routes.professors(req,res);
});
app.get('/professor/:id/', function(req,res) {
    routes.professor(req,res);
});

app.get('/team/', function(req,res) {
    routes.team(req,res);
});

app.get('/admin/', function(req,res) {                    // admin home
    sess = req.session;
    if(sess.user=="admin")
        routes.admin(req,res);
    else
        routes.loginBackToAdmin(req,res);
});
app.get('/admin/:model/', function(req,res) {              // complete model object
    sess = req.session;
    if(sess.user=="admin")
        routes.adminModelViewAll(req,res);
    else
        routes.loginBackToAdmin(req,res);
});
app.get('/admin/:model/create/', function(req,res) {      // GET create record in model
    sess = req.session;
    if(sess.user=="admin")
        routes.adminModelCreate(req,res);
    else
        routes.loginBackToAdmin(req,res);
});
app.post('/admin/:model/create/', function(req,res) {     // POST create record in model
    sess = req.session;
    if(sess.user=="admin")
        routes.adminModelCreatePost(req,res);
    else
        routes.loginBackToAdmin(req,res);
});
app.get('/admin/:model/view/:id/', function(req,res) {     // view a record
    sess = req.session;
    if(sess.user=="admin")
        routes.adminModelView(req,res);
    else
        routes.loginBackToAdmin(req,res);
});
app.get('/admin/:model/update/:id/', function(req,res) {   // GET update a record
    sess = req.session;
    if(sess.user=="admin")
        routes.adminModelUpdate(req,res);
    else
        routes.loginBackToAdmin(req,res);
});
app.post('/admin/:model/update/:id/', function(req,res) {   // POST update a record
    sess = req.session;
    if(sess.user=="admin")
        routes.adminModelUpdatePost(req,res);
    else
        routes.loginBackToAdmin(req,res);
});
app.get('/admin/:model/delete/:id/', function(req,res) {   // delete a record
    sess = req.session;
    if(sess.user=="admin")
        res.send("Delete is not enabled. Please contact developers :P");
    else
        routes.loginBackToAdmin(req,res);
});

// api
app.get('/api/:user/:courseNumber/xmanIsTheSecretKey', function(req,res) {
    routes.apiUserCourse(req,res);
})

// server creation

http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});