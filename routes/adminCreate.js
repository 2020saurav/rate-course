var model = require('../models/index');

var courseModel = model.sequelize.models.course;
var professorModel = model.sequelize.models.professor;

module.exports = function (req, res) {
    var reqModel = req.param("model");
    switch (reqModel)
    {
        case "course":
            res.render('admin/createCourse');
            break;
        case "courseOffering":
            courseModel.findAll().success(function(courses){
                professorModel.findAll().success(function (professors) {
                    res.render('admin/createCourseOffering',{"courses":courses, "professors": professors})
                })
            });
            break;
        default :
            res.send("Not implemented, or wrong model");
            break;
    }
};