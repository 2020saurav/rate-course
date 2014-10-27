var model = require('../models/index');

var courseModel = model.sequelize.models.course;
var professorModel = model.sequelize.models.professor;

module.exports = function (req, res) {
    var reqModel = req.param("model");
    switch (reqModel)
    {
        case "course":
            res.render('admin/createCourse');
            break;
        case "courseOffering":
            courseModel.findAll().success(function(courses){
                professorModel.findAll().success(function (professors) {
                    res.render('admin/createCourseOffering',{"courses":courses, "professors": professors})
                })
            });
            break;
        case "courseOfferingRatingParam":
            res.render('admin/createCourseOfferingRatingParam');
            break;
        case "discussion":
            res.render('admin/createDiscussion');
            break;
        case "professor":
            res.render('admin/createProfessor');
            break;
        case "rating":
            res.render('admin/createRating');
            break;
        case "ratingParam":
            res.render('admin/createRatingParam');
            break;
        case "ratingValue":
            res.render('admin/createRatingValue');
            break;
        case "review":
            res.render('admin/createReview');
            break;
        case "spam":
            res.render('admin/createSpam');
            break;
        case "user":
            res.render('admin/User');
            break;
        default :
            res.send("wrong model");
            break;
    }
};