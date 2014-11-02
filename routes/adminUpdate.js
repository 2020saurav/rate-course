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

ratingModel.hasMany(reviewModel,{foreignKey:'rating_id'});
reviewModel.belongsTo(ratingModel,{foreignKey:'rating_id'});


module.exports = function (req, res) {
    var reqModel = req.param("model");
    var reqId = req.param("id");
    switch (reqModel)
    {
        case "course":
            courseModel.find({
                where : {id : reqId}
            }).success(function(course){
                res.render('admin/updateCourse',{
                    "course" : course,
                    "session":req.session
                })

            });
            break;
        case "courseOffering":
            courseOfferingModel.find({
                where : {id : reqId}
            }).success(function(courseOffering){
                courseModel.findAll().success(function(courses){
                    professorModel.findAll().success(function (professors) {
                        res.render('admin/updateCourseOffering',{"courseOffering":courseOffering, "courses":courses, "professors": professors, "session":req.session})
                    })
                });

            });
            break;
        case "courseOfferingRatingParam":
            courseOfferingRatingParamModel.find({
                where : {id : reqId},
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
            }).success(function(courseOfferingRatingParam){
                        res.render('admin/updateCourseOfferingRatingParam',
                            {"courseOfferingRatingParam": courseOfferingRatingParam, "session": req.session })
            });
            break;
        case "discussion":
            discussionModel.find({
                where : {id : reqId}
            }).success(function(discussion) {
//                res.send(discussions)
                res.render('admin/updateDiscussion',{
                    "discussion" : discussion,
                    "session":req.session
                });
            });
            break;
        case "professor":
            professorModel.find({
                where : {id : reqId}
            }).success(function(professor) {
                res.render('admin/updateProfessor',{
                    "professor" : professor,
                    "session":req.session
                });
            });
            break;
        case "review":
            reviewModel.find({
                where : {id : reqId}
            }).success(function(review) {
                res.render('admin/updateReview',{
                    "review" : review,
                    "session":req.session
                });
            });
            break;
        case "spam":
            spamModel.find({
                where : {id : reqId}
            }).success(function(spam) {
                res.render('admin/updateSpam',{
                    "spam" : spam,
                    "session":req.session
                });
            });
            break;
        case "user":
            userModel.find({
                where : {id : reqId}
            }).success(function(user) {
                res.render('admin/updateUser',{
                    "user" : user,
                    "session":req.session
                });
            });
            break;

        // TODO lak will complete this and corresponding update forms also
        default :
            res.send("def");
            break;
    }
};