var model = require('../models/index');

var courseModel = model.sequelize.models.course;
var professorModel = model.sequelize.models.professor;

module.exports = function (req, res) {
    var reqModel = req.param("model");
    switch (reqModel)
    {
        case "course":
            res.render('admin/createCourse',{"session":req.session});
            break;
        case "courseOffering":
            courseModel.findAll().success(function(courses){
                professorModel.findAll().success(function (professors) {
                    res.render('admin/createCourseOffering',{"courses":courses, "professors": professors, "session":req.session})
                })
            });

            break;
        case "courseOfferingRatingParam":
            res.render('admin/createCourseOfferingRatingParam',{"session":req.session});
            break;
        case "discussion":
            res.render('admin/createDiscussion',{"session":req.session});
            break;
        case "professor":
            res.render('admin/createProfessor',{"session":req.session});
            break;
        case "rating":
            res.render('admin/createRating',{"session":req.session});
            break;
        case "ratingParam":
            res.render('admin/createRatingParam',{"session":req.session});
            break;
        case "ratingValue":
            res.render('admin/createRatingValue',{"session":req.session});
            break;
        case "review":
            res.render('admin/createReview',{"session":req.session});
            break;
        case "spam":
            res.render('admin/createSpam',{"session":req.session});
            break;
        case "user":
            res.render('admin/createUser',{"session":req.session});
            break;
        default :
            res.send("wrong model");
            break;
    }
};