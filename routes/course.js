var model = require('../models/index');
var courseModel = model.sequelize.models.course;
var courseOfferingModel = model.sequelize.models.course_offering;
var profModel = model.sequelize.models.professor;

courseModel.hasMany(courseOfferingModel,{foreignKey:'course_id'});
courseOfferingModel.belongsTo(courseModel,{foreignKey:'course_id'});
profModel.hasMany(courseOfferingModel,{foreignKey:'professor_id'});
courseOfferingModel.belongsTo(profModel,{foreignKey:'professor_id'});

module.exports = function(req,res) {
    var courseId = req.param("id");
    courseModel.find({
        where: {id: courseId},
        include: [
            {
                model:courseOfferingModel,
                include:[profModel]
            }
        ]
    }).success(function(course){
        res.render('course', {
            "course" : course
        })
    })
};