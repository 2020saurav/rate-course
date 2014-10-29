var model = require('../models/index');

module.exports = function(req, res) {
    var courseModel = model.sequelize.models.course;
    var dept = req.param("dept");
    courseModel.findAll({
        where : {"department" : dept}
    }).success(function(courses) {

        res.render('courses',{
            "courses" : courses,
            "session":req.session
        });
    })
};
