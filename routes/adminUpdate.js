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
    var reqId = req.param("id");
    switch (reqModel)
    {
        case "course":
            courseModel.find({
                where : {id : reqId}
            }).success(function(course){
                res.render('admin/updateCourse',{"course" : course})

            });
            break;
        default :
            res.send("def");
            break;
    }
};