var model = require('../models/index');

module.exports = function(req, res) {
    var courseModel = model.sequelize.models.course;
    courseModel.findAll().success(function(courses) {
        res.render('courses',{
            "courses" : courses
        });
    })
};
