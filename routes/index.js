var model = require('../models/index');

exports.index = function(req, res) {
	res.render('index');
}

exports.course = function(req, res) {
    var courseModel = model.sequelize.models.course;
    courseModel.findAll().success(function(courses) {
        res.render('course',{
            "courses" : courses
        });
    })

}

exports.courseOffering = function(req, res) {
    res.render('courseOffering',{
        "courseId" : req.param("id"),
        "instructor" : "Shubhv"

    });
}

exports.home = function(req, res) {
    res.render('home');
}

exports.courserate = function(req, res) {
    res.render('courserate');
}

exports.contact = function(req, res) {
    res.render('contact');
}