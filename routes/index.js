var model = require('../models/index');
var professorModel = model.sequelize.models.professor;
var userModel = model.sequelize.models.user;
exports.index = function(req, res) {
	res.render('index');
};

exports.contact = function(req, res) {
    res.render('contact');
};

exports.team = function(req, res) {
    res.render('team');
};

exports.professors = function(req,res) {
    professorModel.findAll().success(function (professors) {
        res.render('professors',{"professors" : professors});
    })
};
exports.professor = function(req,res) {
    professorModel.find({
        where : {id : req.param("id")}
    }).success(function (professor) {
        res.render('professor',{"professor" : professor});
    })
};

exports.user = function(req,res) {
    userModel.find({
        where : {id : req.param("id")}
    }).success(function (user) {
        res.render('user',{"user" : user});
    })
};

// better not to put the following in loop: Comments here explain functionality:
exports.courses = require('./courses');                 // list all courses
exports.course = require('./course');                   // details of selected course
exports.courseOffering = require('./courseOffering');   // details of selected course offering
exports.courseOfferingRate = require('./courseOfferingRate');

exports.admin = function (req, res) {
    res.render('admin/admin')
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

