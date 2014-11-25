var model = require('../models/index');

module.exports = function(req, res) {
    var courseModel = model.sequelize.models.course;
    courseModel.findAll({
        order: 'overall_rating DESC'
    }).success(function(courses) {
        if(courses) {
            res.render('courses', {
                "courses": courses,
                "session": req.session
            });
        }
        else
        {
            res.render('404',{"session":req.session})
        }
    })
};
