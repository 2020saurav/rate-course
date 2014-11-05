//dependencies
var express = require('express');
var routes = require('./routes');
var model = require('./models/index');
var http = require('http');
var path = require('path');
var bodyParser = require('body-parser');
var session = require('express-session');
var formidable = require('formidable');
var fs = require('fs');

var app = express();
//environments

app.set('port', process.env.PORT||3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use(session({
    secret: 'cookieKaSecret',
    name: 'IITKRateCourseCookie',
    resave: true,
    saveUninitialized: true
}));

var sess;

//routes

// TODO ensure professor does not access other user portals when logged in as professor

app.get('/', routes.courses);                             // app home
app.get('/contact/', function(req,res) {                   // about us page
    routes.team(req,res);
});                    // contact
app.get('/courses/', routes.courses);                    // list all courses
app.get('/course/:id/', function(req,res) {               // selected course
    routes.course(req,res)
});
app.post('/course/:id/', function (req, res) {
   routes.courseDiscussionPost(req,res);
});
app.get('/course/:id/:offeringId/', function(req,res) {   // selected offering
    routes.courseOffering(req,res);
});
app.get('/courses/dept/:dept/', function(req, res) {       // courses of selected department
    routes.coursesDept(req,res);
});
app.get('/forgot/', function (req, res) {                   // forgot Password GET
    if(req.session.user)
        res.redirect('/');
    else
        res.render('forgot',{"session":req.session});
});
app.post('/forgot/', function (req, res) {                   // forgot Password POST
    routes.forgotPost(req,res);
});
app.get('/reset/', function (req, res) {                   // reset Password GET
    if(req.session.user)
            res.redirect('/');
    else
        routes.reset(req,res);
});
app.post('/reset/', function (req, res) {                   // reset Password POST
    routes.resetPost(req,res);
});

app.get('/faq/', function (req, res) {                      // FAQ
    res.render('faq',{"session":req.session})
});
app.get('/terms/', function(req,res) {
   res.render('terms',{"session" : req.session})
});
app.get('/register/', function (req, res) {                 // register GET
    if(req.session.user)
        res.redirect('/');
    else
    res.render('register',{"session":req.session});
});
app.post('/register/', function (req, res) {                 // register POST
    routes.registerPost(req,res);
});
app.get('/search/', function (req, res) {                   // search
    routes.search(req,res);
});

app.post('/course/:id/discussion/spam/:discussionId/', function(req,res) {
    if(req.session.user)
        routes.spamDiscussion(req,res);
    else
        res.send("Login to report spam");
});
app.post('/review/spam/:reviewId/', function(req,res) {
    if(req.session.user)
        routes.spamReview(req,res);
    else
        res.send("Login to report spam");
});


app.get('/course/:id/:offeringId/rate/', function(req,res) {   // selected offering rating : user needs to be logged in
    if(req.session.user)
        routes.courseOfferingRate(req,res);
    else
        routes.loginBackToCourse(req,res);
});
app.post('/course/:id/:offeringId/rate/', function(req,res) {   // POST selected offering rating : user needs to be logged in
    if(req.session.user)
        routes.courseOfferingRatePost(req,res);
    else
        routes.loginBackToCourse(req,res);
});

app.get('/user/:login/', function(req,res) {                   // public profile of this user
    routes.user(req,res);
});
app.get('/user/profile/update/', function(req,res) {                   // public profile of this user
    if(req.session.user)
        routes.userUpdate(req,res);
    else
        res.redirect('/');
});
app.post('/user/profile/update/', function(req,res) {                   // public profile of this user
    if(req.session.user)
        routes.userUpdatePost(req,res);
    else
        res.redirect('/');
});
app.get('/user/meet/requests/', function(req,res) {
   if(req.session.user)
        routes.meetRequests(req,res);
    else
        res.redirect('/');
});


app.post('/profilePicUpload/', function(req,res) {
    if(req.session.user)
      routes.profilePicUpload(req,res);
    else
        res.redirect('/');
});

app.get('/login/', function(req,res) {                          // login GET
    if(req.session.user)
        res.redirect('/');
    else
        res.render('login',{"session":req.session ,"returnURL":"/login/"});

});
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

app.get('/professors/', function(req,res) {             // all professors
    routes.professors(req,res);
});
app.get('/professor/:id/', function(req,res) {          // selected professor
    routes.professor(req,res);
});
app.get('/professor/:id/meet/', function(req,res) {          // selected professor meet GET
    if(req.session.user)
        res.render('meetRequestForm',{"session" : req.session});
    else
        res.redirect('/');
});
app.post('/professor/:id/meet/', function(req,res) {          // selected professor meet POST
    if(req.session.user)
        routes.professorMeetPost(req,res);
    else
        res.redirect('/');
});

app.get('/team/', function(req,res) {                   // about us page
    routes.team(req,res);
});
app.get('/feedback/', function(req,res) {
    if(req.session.user)
        res.render('feedback',{"session":req.session});
    else
        res.render('login',{"session": req.session, "returnURL":"/feedback/"});
});
app.post('/feedback/', function(req,res) {
    if(req.session.user)
        routes.feedbackPost(req,res);
    else
        res.redirect('/');
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

//faculty pages:
app.get('/faculty/', function(req,res) {
    sess = req.session;
    if(sess.role=="faculty")
        routes.facultyHome(req,res);
    else
        res.redirect('/faculty/login/');
});
app.get('/faculty/login/', function(req,res) {
    sess = req.session;
    if(sess.role=="faculty")
        routes.facultyHome(req,res);
    else
        res.render('faculty/login',{"session":req.session ,"returnURL":"/faculty/"});
});
app.post('/faculty/login/', function(req,res) {
    sess = req.session;
    if(sess.role=="faculty")
        routes.facultyHome(req,res);
    else
        routes.facultyLoginPost(req,res);
});
app.get('/faculty/logout/', function(req,res) {
    req.session.destroy(function(err){
        if(err)
            console.log(err);
        else
            res.redirect('/faculty/');
    })
});
app.get('/faculty/meet/approve/:id', function(req,res) {
    sess = req.session;
    if(sess.role=="faculty")
        res.render('faculty/approve',{"session" : req.session});
    else
        res.redirect('/');
});
app.get('/faculty/meet/reject/:id', function(req,res) {
    sess = req.session;
    if(sess.role=="faculty")
        res.render('faculty/reject',{"session" : req.session});
    else
        res.redirect('/');
});
app.post('/faculty/meet/approve/:id', function(req,res) {
    sess = req.session;
    if(sess.role=="faculty")
        routes.facultyApproveMeet(req,res);
    else
        res.redirect('/');
});
app.post('/faculty/meet/reject/:id', function(req,res) {
    sess = req.session;
    if(sess.role=="faculty")
        routes.facultyRejectMeet(req,res);
    else
        res.redirect('/');
});
// api for Kulharia and Arnab
app.get('/api/:user/:courseNumber/xmanIsTheSecretKey', function(req,res) {
    routes.apiUserCourse(req,res);
});

// last route : 404
app.get('*',function(req,res) {
   res.render('404',{"session":req.session});
});
// server creation
http.createServer(app).listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});