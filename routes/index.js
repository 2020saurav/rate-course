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
