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
var visualizationModel = model.sequelize.models.visualization;

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
    var q1data = [];
    var q2data = [];
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
                  visualizationModel.findOne({
                      where: {"course_offering_id" : req.param("offeringId")}
                  }).success(function(visualize){
                          var q1_count1 = visualize.q1_count1;
                          var q1_count2 = visualize.q1_count2;
                          var q1_count3 = visualize.q1_count3;
                          var q1_count4 = visualize.q1_count4;
                          var q1_count5 = visualize.q1_count5;
                          var q2_count1 = visualize.q2_count1;
                          var q2_count2 = visualize.q2_count2;
                          var q2_count3 = visualize.q2_count3;
                          var q2_count4 = visualize.q2_count4;
                          var q2_count5 = visualize.q2_count5;

                        q1data.push({"label": "0-1" , "value" : q1_count1});
                        q1data.push({"label": "1-2" , "value" : q1_count2});
                        q1data.push({"label": "2-3" , "value" : q1_count3});
                        q1data.push({"label": "3-4" , "value" : q1_count4});
                        q1data.push({"label": "4-5" , "value" : q1_count5});
                        q2data.push({"label": "0-1" , "value" : q2_count1});
                        q2data.push({"label": "1-2" , "value" : q2_count2});
                        q2data.push({"label": "2-3" , "value" : q2_count3});
                        q2data.push({"label": "3-4" , "value" : q2_count4});
                        q2data.push({"label": "4-5" , "value" : q2_count5});
                      console.log(q1_count1);
                      res.render('courseOffering', {
                          "courseOffering": courseOffering,
                          "q1data" : q1data,
                          "q2data" : q2data,
                          "session": req.session,
                          "moment": moment
                      });
//                      res.send(courseOffering);

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