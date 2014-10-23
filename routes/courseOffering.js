var model = require('../models/index');

var courseModel = model.sequelize.models.course;
var courseOfferingModel = model.sequelize.models.course_offering;
var profModel = model.sequelize.models.professor;

courseModel.hasMany(courseOfferingModel,{foreignKey:'course_id'});
courseOfferingModel.belongsTo(courseModel,{foreignKey:'course_id'});
profModel.hasMany(courseOfferingModel,{foreignKey:'professor_id'});
courseOfferingModel.belongsTo(profModel,{foreignKey:'professor_id'});

module.exports = function(req, res) {
    var courseOfferingId = req.param("offeringId");
    courseOfferingModel.find({
        where: {id: courseOfferingId},
        include: [
            {
                model:courseModel
            },
            {
                model:profModel
            }
        ]
    }).success(function(courseOffering){
        if(courseOffering.course.id==req.param("id")) {
            res.render('courseOffering',{
                "courseOffering" : courseOffering
            });
        }
        else
            res.send("This offering does not belong this course")
    })
};