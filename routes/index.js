/**
 * @type {exports}
 */
var model = require('../models/index');
/**
 * @returns {string}
 */
String.prototype.capitalize = function() {
    return this.charAt(0).toUpperCase() + this.slice(1);
};

var courseModel = model.sequelize.models.course;
var courseOfferingModel = model.sequelize.models.course_offering;
var profModel = model.sequelize.models.professor;

courseModel.hasMany(courseOfferingModel,{foreignKey:'course_id'});
courseOfferingModel.belongsTo(courseModel,{foreignKey:'course_id'});
profModel.hasMany(courseOfferingModel,{foreignKey:'professor_id'});
courseOfferingModel.belongsTo(profModel,{foreignKey:'professor_id'});

exports.index = function(req, res) {
	res.render('index');
};

exports.contact = function(req, res) {
    res.render('contact');
};

exports.courses = function(req, res) {
    var courseModel = model.sequelize.models.course;
    courseModel.findAll().success(function(courses) {
        res.render('courses',{
            "courses" : courses
        });
    })
};

exports.course = function(req,res) {
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
exports.courseOffering = function(req, res) {
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
};

exports.admin = function (req, res) {
    res.render('admin')
};

exports.adminModelViewAll = function (req, res) {
    var viewFileName = "viewAll"+(req.param("model").capitalize());
    res.render(viewFileName);
};

exports.adminModelCreate = function (req, res) {
    res.render('createCourse')
};

exports.adminModelView = function (req, res) {
    res.render('viewAllCourse')
};
exports.adminModelUpdate = function (req, res) {
    res.render('viewAllCourse')
};
exports.adminModelDelete = function (req, res) {
    res.render('viewAllCourse')
};

exports.adminModelCreatePost =  function(req,res) {
    // write sequlize here
    res.send("Here");
};


