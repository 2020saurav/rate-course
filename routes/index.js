var model = require('../models/index');

String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

exports.index = function(req, res) {
	res.render('index');
};

exports.contact = function(req, res) {
    res.render('contact');
};

// better not to put the following in loop: Comments here explain functionality:
exports.courses = require('./courses');                 // list all courses
exports.course = require('./course');                   // details of selected course
exports.courseOffering = require('./courseOffering');   // details of selected course offering


// move the following into separate files if more than 3-4 lines.

exports.admin = function (req, res) {
    res.render('admin/admin')
};

exports.adminModelViewAll = require('./adminViewAll');

exports.adminModelCreate = function (req, res) {
    res.render('admin/createCourse')
};

exports.adminModelView = function (req, res) {
    res.render('admin/viewAllCourse')
};
exports.adminModelUpdate = function (req, res) {
    res.render('admin/viewAllCourse')
};
exports.adminModelDelete = function (req, res) {
    res.render('admin/viewAllCourse')
};

exports.adminModelCreatePost =  function(req,res) {
    // write sequlize here
    res.send("Here");
};


