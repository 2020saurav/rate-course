var model = require('../models/index');

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
    res.send(req.body);
    //return
    var reqModel = req.param("model");
    //res.send(reqModel);


    switch(reqModel)
    {
        case "course":
            courseModel.update({ course_number: req.body.courseNumber, course_name: req.body.courseName, description: req.body.description, department: req.body.department},
                { where: {id: req.param("id")}}).error(function(err){
                console.log("unable to update database");
            });
            break;
        case "courseOffering":
            courseOfferingModel.update({ course_id: req.body.courseId, year: req.body.year, semester: req.body.semester, professor_id: req.body.professorId, number_of_students: req.body.numberOfStudents, website: req.body.website},
                { where: {id: req.param("id")}}).success(function(affectedRows) {
                console.log(affectedRows);
            }).error(function(err){
                console.log("unable to update database");
            });
            break;
        case "courseOfferingRatingParam":
            courseOfferingRatingParamModelModel.update({ course_offering_id: req.body.courseOfferingId, rating_param_id: req.body.ratingParamId, weight: req.body.weight, max_value: req.body.maxValue },
                { where: {id: req.param("id")}}).success(function(affectedRows) {
                console.log(affectedRows);
            }).error(function(err){
                console.log("unable to update database");
            });
            break;
        case "discussion":
            discussionModel.update({user_id: req.body.userId, course_id: req.body.courseId, comment: req.body.comment, create_time: req.body.createTime},
                { where: {id: req.param("id")}}).success(function(affectedRows) {
                console.log(affectedRows);
            }).error(function(err){
                console.log("unable to update database");
            });
            break;
        case "professor":
            professorModel.update({ first_name: req.body.firstName, last_name: req.body.lastName, designation: req.body.designation, department: req.body.department, email: req.body.email, homepage_url: req.body.homepageUrl, photo_url: req.body.photoUrl},
                { where: {id: req.param("id")}}).success(function(affectedRows) {
                console.log(affectedRows);
            }).error(function(err){
                console.log("unable to update database");
            });
            break;
        case "rating":
            ratingModel.update({ user_id: req.body.userId, course_offering_id: req.body.courseOfferingId, create_time: req.body.createTime },
                { where: {id: req.param("id")}}).success(function(affectedRows) {
                console.log(affectedRows);
            }).error(function(err){
                console.log("unable to update database");
            });
            break;
        case "ratingParam":
            ratingParamModel.update({name: req.body.name, type: req.body.type, sort_order: req.body.sortOrder},
                { where: {id: req.param("id")}}).success(function(affectedRows) {
                console.log(affectedRows);
            }).error(function(err){
                console.log("unable to update database");
            });
            break;
        case "ratingValue":
            ratingValueModel.update({rating_id: req.body.ratingId, rating_param_id: req.body.ratingParamId, value: req.body.value},
                { where: {id: req.param("id")}}).success(function(affectedRows) {
                console.log(affectedRows);
            }).error(function(err){
                console.log("unable to update database");
            });
            break;
        case "review":
            reviewModel.update({rating_id: req.body.ratingId, course_comment: req.body.courseComment, prof_comment: req.body.profComment},
                { where: {id: req.param("id")}}).success(function(affectedRows) {
                console.log(affectedRows);
            }).error(function(err){
                console.log("unable to update database");
            });
            break;
        case "spam":
            spamModel.update({user_id: req.body.userId,type: req.body.type, item_id: req.body.itemId, create_time: req.body.createTime},
                { where: {id: req.param("id")}}).success(function(affectedRows) {
                console.log(affectedRows);
            }).error(function(err){
                console.log("unable to update database");
            });
            break;
        case "user":
            userModel.update({login: req.body.login, password: req.body.password, email: req.body.email, first_name: req.body.firstName, last_name: req.body.lastName, photo_url: req.body.photoUrl},
                { where: {id: req.param("id")}}).success(function(affectedRows) {
                console.log(affectedRows);
            }).error(function(err){
                console.log("unable to update database");
            });
            break;
        default:
            res.send("Wrong URL");
            break;
    }
    // Ankita will insert this in database.
    // will need switch case here. look at json response and accordingly name the fields and enter in db

}