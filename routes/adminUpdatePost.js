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
    var reqModel = req.param("model");
    switch(reqModel)
    {
        case "course":
            courseModel.update({ 
                    course_number: req.body.courseNumber, 
                    course_name: req.body.courseName, 
                    description: req.body.description, 
                    department: req.body.department
                },
                { where: {id: req.param("id")}
                }).success(function(info){
                console.log("Table Course updated");
                    res.redirect('/admin/course/');

                });
            break;
        case "courseOffering":
            courseOfferingModel.update({ 
                    course_id: req.body.courseId, 
                    year: req.body.year, 
                    semester: req.body.semester, 
                    professor_id: req.body.professorId, 
                    number_of_students: req.body.numberOfStudents, 
                    website: req.body.website
                },
                { where: {id: req.param("id")}
                }).success(function(affectedRows) {
                    console.log(affectedRows);
            }).success(function(info){
                console.log("Table CO updated");
                    res.redirect('/admin/courseOffering/');

                });
            break;
        case "courseOfferingRatingParam":
            courseOfferingRatingParamModel.update({
                    weight: req.body.weight,
                    max_value: req.body.maxValue
                },
                { where: {id: req.param("id")}}).success(function(affectedRows) {
                    console.log(affectedRows);
            }).success(function(info){
                console.log("Table CORP updated");
                    res.redirect('/admin/courseOfferingRatingParam/');

                });
            break;
        case "discussion":
            discussionModel.update({
                    spam_flag_count: req.body.spamCount,
                    is_deleted: req.body.isDeleted,
                    as_anon: req.body.asAnon,
                    comment : req.body.comment
                },
                { where: {id: req.param("id")}}).success(function(affectedRows) {
                    console.log(affectedRows);
            }).success(function(info){
                console.log("Table DISC updated");
                    res.redirect('/admin/discussion/');

                });
            break;
        case "professor":
            professorModel.update({
                    first_name: req.body.firstName,
                    last_name: req.body.lastName,
                    designation: req.body.designation,
                    department: req.body.department,
                    email: req.body.email,
                    homepage_url: req.body.homepageUrl,
                    photo_url: req.body.photoUrl,
                    login : req.body.login,
                    password : req.body.password
                },
                { where: {id: req.param("id")}}).success(function(affectedRows) {
                console.log(affectedRows);
            }).success(function(info){
                console.log("Table PROF updated");
                    res.redirect('/admin/professor/');

                });
            break;
        case "rating":
            ratingModel.update({
                    user_id: req.body.userId,
                    course_offering_id: req.body.courseOfferingId,
                    create_time: req.body.createTime
                },
                { where: {id: req.param("id")}}).success(function(affectedRows) {
                    console.log(affectedRows);
            }).success(function(info){
                console.log("Table RATING updated");
                    res.redirect('/admin/rating/');

                });
            break;
        case "ratingParam":
            ratingParamModel.update({
                    name: req.body.name,
                    type: req.body.type,
                    sort_order: req.body.sortOrder
                },
                { where: {id: req.param("id")}}).success(function(affectedRows) {
                    console.log(affectedRows);
            }).success(function(info){
                console.log("Table RP updated");
                    res.redirect('/admin/ratingParam/');

                });
            break;
        case "ratingValue":
            ratingValueModel.update({
                    rating_id: req.body.ratingId,
                    rating_param_id: req.body.ratingParamId,
                    value: req.body.value},
                { where: {id: req.param("id")}}).success(function(affectedRows) {
                    console.log(affectedRows);
            }).success(function(info){
                console.log("Table RV updated");
                    res.redirect('/admin/ratingValue/');

                });
            break;
        case "review":
            reviewModel.update({
                    spam_flag_count: req.body.spamCount,
                    is_deleted: req.body.isDeleted},
                { where: {id: req.param("id")}}).success(function(affectedRows) {
                    console.log(affectedRows);
            }).success(function(info){
                console.log("Table REVIEW updated");
                    res.redirect('/admin/review/');

                });
            break;
        case "spam":
            spamModel.update({
                    "is_resolved" : req.body.isResolved
                },
                { where: {id: req.param("id")}}).success(function(affectedRows) {
                    console.log(affectedRows);
            }).success(function(info){
                console.log("Table SPAM updated");
                    res.redirect('/admin/spam/');
            });
            break;
        case "user":
            userModel.update({
                    email: req.body.email,
                    first_name: req.body.firstName,
                    last_name: req.body.lastName,
                    photo_url: req.body.photoUrl
                },
                { where: {id: req.param("id")}}).success(function(affectedRows) {
                    console.log(affectedRows);
            }).success(function(info){
                console.log("Table USER updated");
                    res.redirect('/admin/user/');

                });
            break;
        default:
            res.send("Wrong URL");
            break;
    }

};