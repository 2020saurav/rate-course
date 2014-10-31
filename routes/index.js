var model = require('../models/index');
var nodemailer = require('nodemailer');
var professorModel = model.sequelize.models.professor;
var userModel = model.sequelize.models.user;
exports.index = function(req, res) {
	res.render('index',{"session":req.session});
};
exports.loginBackToCourse = function(req, res) {
    var returnURL="/course/"+req.param("id")+"/"+req.param("offeringId")+"/rate/";
    if(typeof (req.session.user)!=="undefined")
        res.redirect(returnURL);
    res.render('login',{"returnURL" : returnURL, "session":req.session});
};
exports.loginBackToAdmin = function(req, res) {
    var returnURL = "/admin/";
    res.render('login',{"returnURL" : returnURL, "session":req.session});
};

exports.loginPost = require('./loginPost');

exports.contact = function(req, res) {
    res.render('contact',{"session":req.session});
};

exports.team = function(req, res) {
    res.render('team',{"session":req.session});
};

exports.professors = function(req,res) {
    professorModel.findAll().success(function (professors) {
        res.render('professors',{"professors" : professors, "session":req.session});
    })
};
exports.professor = function(req,res) {
    professorModel.find({
        where : {id : req.param("id")}
    }).success(function (professor) {
        res.render('professor',{"professor" : professor, "session":req.session});
    })
};

exports.user = function(req,res) {
    userModel.find({
        where : {id : req.param("id")}
    }).success(function (user) {
        res.render('user',{"user" : user, "session":req.session});
    })
};

// course stuff:
exports.courses = require('./courses');                 // list all courses
exports.course = require('./course');                   // details of selected course
exports.coursesDept = require('./coursesDept');           // list all courses of selected department
exports.courseOffering = require('./courseOffering');   // details of selected course offering
exports.courseOfferingRate = require('./courseOfferingRate');
exports.courseOfferingRatePost = require('./courseOfferingRatePost');

//user profile:
//exports.profileUpdate = require('./profileUpdate');


// admin stuff
exports.admin = function (req, res) {
    res.render('admin/admin',{"session":req.session})
};
exports.adminModelViewAll = require('./adminViewAll');
exports.adminModelCreate = require('./adminCreate');
exports.adminModelCreatePost = require('./adminCreatePost');
exports.adminModelView = require('./adminView');
exports.adminModelUpdate = require('./adminUpdate');
exports.adminModelUpdatePost = require('./adminUpdatePost');
exports.adminModelDelete = function (req, res) {
    res.send("Deleting is reserved!")
};

exports.apiUserCourse = require('./apiUserCourse');

exports.testmail = function(req,res)
{
    var transporter = nodemailer.createTransport("SMTP",{
        service: 'Gmail',
        auth: {
            user: 'rate.course.iitk@gmail.com',
            pass: 'rate.course.iitk2014'
        }
    });
    var mailOptions = {
        from: 'Rate Course IITK <rate.course.iitk@gmail.com>',
        to: '2020saurav@gmail.com',
        subject: 'Test Mail',
        text: 'Where is this going?',
        html: '<b> htm test</b> done?'
    };
    // text gets suppressed when html is also sent. Better send html always :D
    transporter.sendMail(mailOptions, function(error, info){
        if(error)
        {
            console.log(error);
        }
        else
        {
            console.log(
                    "Sent: \nFrom: " + mailOptions.from +
                    "\nTo: "+ mailOptions.to +
                    "\n Subject: "+ mailOptions.subject+
                    "\n Body: "+ mailOptions.text+
                    "\n HTML: "+ mailOptions.html
            );
        }
    });

};