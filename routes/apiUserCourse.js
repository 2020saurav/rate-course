var model = require('../models/index');
var courseModel = model.sequelize.models.course;
var courseOfferingModel = model.sequelize.models.course_offering;
var userModel = model.sequelize.models.user;
var ratingModel = model.sequelize.models.rating;
var ratingValueModel = model.sequelize.models.rating_value;
var ratingParamModel = model.sequelize.models.rating_param;

courseModel.hasMany(courseOfferingModel,{foreignKey:'course_id'});
courseOfferingModel.belongsTo(courseModel,{foreignKey:'course_id'});

userModel.hasMany(ratingModel,{foreignKey:'user_id'});
ratingModel.belongsTo(userModel,{foreignKey:'user_id'});

ratingModel.hasMany(ratingValueModel,{foreignKey:'rating_id'});
ratingValueModel.belongsTo(ratingModel,{foreignKey:'rating_id'});

ratingParamModel.hasOne(ratingValueModel,{foreignKey:'rating_param_id'});
ratingValueModel.belongsTo(ratingParamModel,{foreignKey:'rating_param_id'});

module.exports = function(req,res) {
    var login = req.param("user");
    var courseNumber = req.param("courseNumber");
    var cOIDs=[];
    userModel.find({
        where: {"login" : login},
        attributes : ['id','login','first_name','last_name']
    }).success(function(user)
    {
        courseModel.findOne(
            {
                where: {"course_number" : courseNumber}
            }
        ).success(function(course){
                courseOfferingModel.findAll({
                    where: {"course_id" : course.id},
                    attributes: ['id','year','semester']
                }).success(function (courseOfferings) {
                    for (var i=0; i<courseOfferings.length; i++)
                    {
                        cOIDs.push(courseOfferings[i]["id"]);
                    }
                    ratingModel.findOne({
                        where : {"user_id":user.id, "course_offering_id":cOIDs},
                        attributes: ['id'],
                        include : [
                            {
                                model : ratingValueModel,
                                attributes: ['value'],
                                include : [
                                    {
                                        model : ratingParamModel,
                                        attributes: ['name','type']
                                    }
                                ]
                            }
                        ]
                    }).success(function(rating){
                        res.send({"user": user, "course": course, "rating": rating})
                    })
                });
        })
    })
};