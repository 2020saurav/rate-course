var model = require('../models/index');
var moment = require('moment');

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


courseModel.hasMany(courseOfferingModel,{foreignKey:'course_id'});
courseOfferingModel.belongsTo(courseModel,{foreignKey:'course_id'});
professorModel.hasMany(courseOfferingModel,{foreignKey:'professor_id'});
courseOfferingModel.belongsTo(professorModel,{foreignKey:'professor_id'});

courseOfferingModel.hasMany(courseOfferingRatingParamModel,{foreignKey:'course_offering_id'});
courseOfferingRatingParamModel.belongsTo(courseOfferingModel,{foreignKey:'course_offering_id'});
ratingParamModel.hasMany(courseOfferingRatingParamModel,{foreignKey:'rating_param_id'});
courseOfferingRatingParamModel.belongsTo(ratingParamModel,{foreignKey:'rating_param_id'});

courseModel.hasMany(discussionModel,{foreignKey:'course_id'});
discussionModel.belongsTo(courseModel,{foreignKey:'course_id'});
userModel.hasMany(discussionModel,{foreignKey:'user_id'});
discussionModel.belongsTo(userModel,{foreignKey:'user_id'});

userModel.hasMany(ratingModel,{foreignKey:'user_id'});
ratingModel.belongsTo(userModel,{foreignKey:'user_id'});
courseOfferingModel.hasMany(ratingModel,{foreignKey:'course_offering_id'});
ratingModel.belongsTo(courseOfferingModel,{foreignKey:'course_offering_id'});

ratingModel.hasMany(ratingValueModel,{foreignKey:'rating_id'});
ratingValueModel.belongsTo(ratingModel,{foreignKey:'rating_id'});
ratingParamModel.hasMany(ratingValueModel,{foreignKey:'rating_param_id'});
ratingValueModel.belongsTo(ratingParamModel,{foreignKey:'rating_param_id'});

ratingModel.hasOne(reviewModel,{foreignKey:'rating_id'});
reviewModel.belongsTo(ratingModel,{foreignKey:'rating_id'});

userModel.hasMany(spamModel,{foreignKey:'user_id'});
spamModel.belongsTo(userModel,{foreignKey:'user_id'});

module.exports = function (req, res) {
    var reqModel = req.param("model");
    switch(reqModel)
    {
        case "course":
            courseModel.findAll().success(function(courses) {
                res.render('admin/viewAllCourse',{
                    "courses" : courses,
                    "session":req.session
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
                res.render('admin/viewAllCourseOffering', {
                    "courseOfferings": courseOfferings,
                    "session":req.session
                });
            });
            break;
        case "courseOfferingRatingParam":
            courseOfferingRatingParamModel.findAll({
                include: [
                    {
                        model:ratingParamModel
                    },
                    {
                        model:courseOfferingModel,
                        include : [
                            {
                                model:courseModel
                            }
                        ]
                    }
                ]

            }).success(function(courseOfferingRatingParams) {
//               res.send(courseOfferingRatingParams)
                res.render('admin/viewAllCourseOfferingRatingParam',{
                    "params" : courseOfferingRatingParams,
                    "session":req.session
                });

            });
            break;
        case "discussion":
            discussionModel.findAll({
                include: [
                    {
                        model:userModel
                    },
                    {
                        model:courseModel
                    }
                ]

            }).success(function(discussions) {
//                res.send(discussions)
                res.render('admin/viewAllDiscussion',{
                    "discussions" : discussions,
                    "session":req.session
                });
            });
            break;
        case "professor":
            professorModel.findAll().success(function(professors) {
                res.render('admin/viewAllProfessor',{
                    "professors" : professors,
                    "session":req.session
                });
            });
            break;
        case "rating":
            ratingModel.findAll({
                include: [
                    {
                        model:userModel
                    },
                    {
                        model:courseOfferingModel,
                        include : [
                            {
                                model:courseModel
                            }
                        ]
                    }
                ]
            }).success(function(ratings) {
//                res.send(ratings)
                res.render('admin/viewAllRating',{
                    "ratings" : ratings,
                    "session":req.session
                });
            });
            break;
        case "ratingParam":
            ratingParamModel.findAll().success(function(ratingParams) {
                res.render('admin/viewAllRatingParam',{
                    "ratingParams" : ratingParams,
                    "session":req.session
                });
            });
            break;
        case "ratingValue":
            ratingValueModel.findAll({
                where : ["rating_param_id > ?",0],
                include: [
                    {
                        model:ratingParamModel
                    },
                    {
                        model:ratingModel,
                        include : [
                            {
                                model:userModel
                            },
                            {
                                model:courseOfferingModel,
                                include : [
                                    {
                                        model:courseModel
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }).success(function(ratingValues) {
                res.render('admin/viewAllRatingValue',{
                    "ratingValues" : ratingValues,
                    "session":req.session
                });
            });
            break;
        case "review":
            reviewModel.findAll({
                include: [
                    {
                        model: ratingModel,
                        include : [
                            {
                                model:userModel
                            },
                            {
                                model:courseOfferingModel,
                                include : [
                                    {
                                        model:courseModel
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }).success(function(reviews) {
                res.render('admin/viewAllReview',{
                    "reviews" : reviews,
                    "session":req.session
                });
            });
            break;
        case "spam":
            spamModel.findAll(
                {
                include : [
                    {
                        model: userModel
                    }
                ],
                order:'id DESC'

            }).success(function(spams) {
                res.render('admin/viewAllSpam',{
                    "spams" : spams,
                    "session":req.session,
                    "moment" : moment
                });
            });
            break;
        case "user":
            userModel.findAll().success(function(users) {
                res.render('admin/viewAllUser',{
                    "users" : users,
                    "session":req.session
                });
            });
            break;
        default:
            res.send("Wrong URL");
            break;
    }
};