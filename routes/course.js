var model = require('../models/index');
var moment = require('moment');

var courseModel = model.sequelize.models.course;
var courseOfferingModel = model.sequelize.models.course_offering;
var profModel = model.sequelize.models.professor;
var userModel = model.sequelize.models.user;
var discussionModel = model.sequelize.models.discussion;

courseModel.hasMany(courseOfferingModel,{foreignKey:'course_id'});
courseOfferingModel.belongsTo(courseModel,{foreignKey:'course_id'});
profModel.hasMany(courseOfferingModel,{foreignKey:'professor_id'});
courseOfferingModel.belongsTo(profModel,{foreignKey:'professor_id'});

courseModel.hasMany(discussionModel,{foreignKey:'course_id'});
discussionModel.belongsTo(courseModel,{foreignKey:'course_id'});
userModel.hasMany(discussionModel,{foreignKey:'user_id'});
discussionModel.belongsTo(userModel,{foreignKey:'user_id'});

module.exports = function(req,res) {
    var courseId = req.param("id");
    courseModel.find({
        where: {id: courseId},
        include: [
            {
                model:courseOfferingModel,
                include:[
                    {
                        model:profModel
                    }
                ]
            },
            {
                model:discussionModel,
                where : {"is_deleted" : false},
                include:[
                    {
                        model: userModel
                    }
                ]
            }
        ]
    }).success(function(course){
//        res.send(course);
        res.render('course', {
            "course" : course,
            "session":req.session,
            "moment":moment
        })
    })
};