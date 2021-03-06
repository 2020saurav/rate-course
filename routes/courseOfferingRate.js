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

ratingModel.hasOne(reviewModel,{foreignKey:'rating_id'});
reviewModel.belongsTo(ratingModel,{foreignKey:'rating_id'});
module.exports = function(req, res) {
    var courseOfferingId = req.param("offeringId");

    ratingModel.findOne({
        where: { "user_id" : req.session.userId, "course_offering_id": courseOfferingId}
    }).success(function(rating) {
        if(rating)
        {
            // already rated
            res.render("message",{"message" : "You have already rated this Course!", "session" : req.session});
        }
        else
        {
            courseOfferingModel.find({
                where : {"id" : courseOfferingId},
                include : [
                    {
                        model : courseModel
                    },
                    {
                        model : professorModel
                    },
                    {
                        model : courseOfferingRatingParamModel,
                        include : [
                            {
                                model: ratingParamModel
                            }
                        ]
                    }
                ]
            }).success(function(courseOfferingRatingParam){
                if(courseOfferingRatingParam) {
                    res.render('courseOfferingRate', {
                        "courseOfferingRatingParam": courseOfferingRatingParam,
                        "session": req.session
                    });
                }
                else
                {
                    res.render('404',{"session":req.session})
                }
            });
        }
    });
};

