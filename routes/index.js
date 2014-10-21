var model = require('../models/index');

exports.index = function(req, res) {
	res.render('index');
}

exports.courses = function(req, res) {
    var courseModel = model.sequelize.models.course;
    courseModel.findAll().success(function(courses) {
        res.render('courses',{
            "courses" : courses
        });
    })
}

exports.course = function(req,res) {
    var courseModel = model.sequelize.models.course;
    var courseOfferingModel = model.sequelize.models.course_offering;
    var profModel = model.sequelize.models.professor;

    courseModel.hasMany(courseOfferingModel,{foreignKey:'course_id'})
    courseOfferingModel.belongsTo(courseModel,{foreignKey:'course_id'})
    profModel.hasMany(courseOfferingModel,{foreignKey:'professor_id'})
    courseOfferingModel.belongsTo(profModel,{foreignKey:'professor_id'})
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
}
exports.courseOffering = function(req, res) {

    var courseModel = model.sequelize.models.course;
    var courseOfferingModel = model.sequelize.models.course_offering;
    var profModel = model.sequelize.models.professor;

    courseModel.hasMany(courseOfferingModel,{foreignKey:'course_id'})
    courseOfferingModel.belongsTo(courseModel,{foreignKey:'course_id'})
    profModel.hasMany(courseOfferingModel,{foreignKey:'professor_id'})
    courseOfferingModel.belongsTo(profModel,{foreignKey:'professor_id'})

    var courseId = req.param("offeringId");
    courseOfferingModel.find({
        where: {id: courseId},
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
}
