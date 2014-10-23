var model = require('../models/index');

var courseModel = model.sequelize.models.course;
var courseOfferingModel = model.sequelize.models.course_offering;
var profModel = model.sequelize.models.professor;

courseModel.hasMany(courseOfferingModel,{foreignKey:'course_id'});
courseOfferingModel.belongsTo(courseModel,{foreignKey:'course_id'});
profModel.hasMany(courseOfferingModel,{foreignKey:'professor_id'});
courseOfferingModel.belongsTo(profModel,{foreignKey:'professor_id'});

module.exports = function (req, res) {
    var reqModel = req.param("model");
    switch(reqModel)
    {
        case "course":
            courseModel.findAll().success(function(courses) {
                res.render('admin/viewAllCourse',{
                    "courses" : courses
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
                        model:profModel
                    }
                ]
            }).success(function(courseOfferings) {
//                res.send(courseOfferings)

                res.render('admin/viewAllCourseOffering', {
                    "courseOfferings": courseOfferings
                });
            });
            break;

        default:
            res.send(reqModel);
            break;
    }
};