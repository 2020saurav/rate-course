var model = require('../models/index');
var sha1 = require('sha1');

var courseModel = model.sequelize.models.course;
var courseOfferingModel = model.sequelize.models.course_offering;
var professorModel = model.sequelize.models.professor;
var courseOfferingRatingParamModel = model.sequelize.models.course_offering_rating_param;
var discussionModel = model.sequelize.models.discussion;
var ratingModel = model.sequelize.models.rating;
var ratingParamModel = model.sequelize.models.rating_param;
var ratingValueModel = model.sequelize.models.rating_value;
var reviewModel = model.sequelize.models.review;
var spamModel = model.sequelize.models.spam;
var userModel = model.sequelize.models.user;

module.exports = function (req, res) {
    var reqModel = req.param("model");
    switch(reqModel)
    {
        case "course":
            courseModel.create({ 
                course_number: req.body.courseNumber, 
                course_name: req.body.courseName, 
                description: req.body.description, 
                department: req.body.department
            }).success(function(data){
                console.log("Table Course : Entry Added");
            });
            break;
        case "courseOffering":
            courseOfferingModel.create({
                course_id: req.body.courseId,
                year: req.body.year,
                semester: req.body.semester,
                professor_id: req.body.professorId,
                number_of_students: req.body.numberOfStudents,
                website: req.body.website
            }).success(function(data){
                console.log("Table CO: Entry Added");
            });
            break;
        case "courseOfferingRatingParam":
            courseOfferingRatingParamModel.create({
                course_offering_id: req.body.courseOfferingId,
                rating_param_id: req.body.ratingParamId,
                weight: req.body.weight,
                max_value: req.body.maxValue
            }).success(function(data){
                console.log("Table CORP : Entry Added");
            });
            break;
        case "discussion":
            discussionModel.create({
                user_id: req.body.userId,
                course_id: req.body.courseId,
                comment: req.body.comment,
                create_time: req.body.createTime
            }).success(function(data){
                console.log("Table DISC : Entry Added");
            });
            break;
        case "professor":
            professorModel.create({
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                designation: req.body.designation,
                department: req.body.department,
                email: req.body.email,
                homepage_url: req.body.homepageUrl,
                photo_url: req.body.photoUrl,
                login : req.body.login,
                password : sha1(req.body.password)
            }).success(function(data){
                console.log("Table PROF : Entry Added");
            });
            break;
        case "rating":
            ratingModel.create({
                user_id: req.body.userId,
                course_offering_id: req.body.courseOfferingId,
                create_time: req.body.createTime
            }).success(function(data){
                console.log("Table RATING : Entry Added");
            });
            break;
        case "ratingParam":
            ratingParamModel.create({
                name: req.body.name,
                type: req.body.type,
                sort_order: req.body.sortOrder
            }).success(function(data){
                console.log("Table RP : Entry Added");
            });
            break;
        case "ratingValue":
            ratingValueModel.create({
                rating_id: req.body.ratingId,
                rating_param_id: req.body.ratingParamId,
                value: req.body.value
            }).success(function(data){
                console.log("Table RV : Entry Added");
            });
            break;
        case "review":
            reviewModel.create({
                rating_id: req.body.ratingId,
                course_comment: req.body.courseComment,
                prof_comment: req.body.profComment
            }).success(function(data){
                console.log("Table REVIEW : Entry Added");
            });
            break;
        case "spam":
           spamModel.create({
               user_id: req.body.userId,
               type: req.body.type,
               item_id: req.body.itemId,
               create_time: req.body.createTime
           }).success(function(data){
               console.log("Table SPAM: Entry Added");
           });
            break;
        case "user":
            userModel.create({
                login: req.body.login,
                password: sha1(req.body.password),
                email: req.body.email,
                first_name: req.body.firstName,
                last_name: req.body.lastName,
                photo_url: req.body.photoUrl
            }).success(function(data){
                console.log("Table USER: Entry Added");
            });
            break;
        default:
            res.send("Wrong URL");
            break;
    }
    res.redirect('/admin/');
};
