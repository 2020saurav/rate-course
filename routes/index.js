var model = require('../models/index');

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

