var model = require('../models/index');
var moment = require('moment');

var courseModel = model.sequelize.models.course;
var courseOfferingModel = model.sequelize.models.course_offering;
var professorModel = model.sequelize.models.professor;
var cumulativeRatingValueModel = model.sequelize.models.cumulative_rating_value;
var ratingParamModel = model.sequelize.models.rating_param;
var ratingModel = model.sequelize.models.rating;
var reviewModel = model.sequelize.models.review;
var userModel = model.sequelize.models.user;

courseModel.hasMany(courseOfferingModel,{foreignKey:'course_id'});
courseOfferingModel.belongsTo(courseModel,{foreignKey:'course_id'});
professorModel.hasMany(courseOfferingModel,{foreignKey:'professor_id'});
courseOfferingModel.belongsTo(professorModel,{foreignKey:'professor_id'});

courseOfferingModel.hasMany(cumulativeRatingValueModel,{foreignKey:'course_offering_id'});
cumulativeRatingValueModel.belongsTo(courseOfferingModel,{foreignKey:'course_offering_id'});

ratingParamModel.hasMany(cumulativeRatingValueModel,{foreignKey:'rating_param_id'});
cumulativeRatingValueModel.belongsTo(ratingParamModel,{foreignKey:'rating_param_id'});

courseOfferingModel.hasMany(ratingModel,{foreignKey:'course_offering_id'});
ratingModel.belongsTo(courseOfferingModel,{foreignKey:'course_offering_id'});

ratingModel.hasOne(reviewModel,{foreignKey:'rating_id'});
reviewModel.belongsTo(ratingModel,{foreignKey:'rating_id'});

userModel.hasMany(ratingModel,{foreignKey:'user_id'});
ratingModel.belongsTo(userModel,{foreignKey:'user_id'});

module.exports = function(req, res) {
    var courseOfferingId = req.param("offeringId");
    courseOfferingModel.find({
        where: {id: courseOfferingId},
        include: [
            {
                model:courseModel
            },
            {
                model:professorModel
            },
            {
                model:cumulativeRatingValueModel,
                include:[
                    {model: ratingParamModel}
                ]
            },
            {
                model:ratingModel,
                include:[
                    {
                        model:reviewModel
                    },
                    {
                        model:userModel
                    }
                ]
            }
        ]
    }).success(function(courseOffering){
        if(courseOffering) {
            if (courseOffering.course.id == req.param("id")) {
                res.render('courseOffering', {
                    "courseOffering": courseOffering,
                    "session": req.session,
                    "moment": moment
                });
            }
            else
                res.render('404', {"session": req.session})
        }
        else
        {
            res.render('404',{"session":req.session})
        }
    })
};