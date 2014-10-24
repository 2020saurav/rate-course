var model = require('../models/index');

var courseModel = model.sequelize.models.course;
var courseOfferingModel = model.sequelize.models.course_offering;
var professorModel = model.sequelize.models.professor;
var courseOfferingRatingParamModel = model.sequelize.models.course_offering_rating_param;
var discussionModel = model.sequelize.models.discussion;
var ratingModel = model.sequelize.models.rating;
var ratingParamModel = model.sequelize.models.rating_param;
var ratingValueModel = model.sequelize.models.rating_value;

courseModel.hasMany(courseOfferingModel,{foreignKey:'course_id'});
courseOfferingModel.belongsTo(courseModel,{foreignKey:'course_id'});
professorModel.hasMany(courseOfferingModel,{foreignKey:'professor_id'});
courseOfferingModel.belongsTo(professorModel,{foreignKey:'professor_id'});

module.exports = function (req, res) {
    var reqModel = req.param("model");
    switch(reqModel)
    {
        case "course":
            courseModel.findAll().success(function(courses) {
                res.render('admin/viewAllCourse',{
                    "courses" : courses
                });
            });
            break;
        case "courseOffering":
            courseOfferingModel.findAll({

                include: [
                    {
                        model:courseModel
                    },
                    {
                        model:professorModel
                    }
                ]
            }).success(function(courseOfferings) {
//                res.send(courseOfferings)
                res.render('admin/viewAllCourseOffering', {
                    "courseOfferings": courseOfferings
                });
            });
            break;
        case "courseOfferingRatingParam":
            courseOfferingRatingParamModel.findAll().success(function(courseOfferingRatingParams) {
//                res.send(courseOfferingRatingParams);
                res.render('admin/viewAllCourseOfferingRatingParam',{
                    "params" : courseOfferingRatingParams
                });

            });
            break;
        case "discussion":
            discussionModel.findAll().success(function(discussions) {
                res.render('admin/viewAllDiscussion',{
                    "discussions" : discussions
                });
            });
            break;
        case "professor":
            professorModel.findAll().success(function(professors) {
                res.render('admin/viewAllProfessor',{
                    "professors" : professors
                });
            });
            break;
        case "rating":
            ratingModel.findAll().success(function(ratings) {
                res.render('admin/viewAllRating',{
                    "ratings" : ratings
                });
            });
            break;


        default:
            res.send(reqModel);
            break;
    }
};