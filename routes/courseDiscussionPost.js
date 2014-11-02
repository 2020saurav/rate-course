var model = require('../models/index');
var moment = require('moment');
var discussionModel = model.sequelize.models.discussion;

module.exports = function(req, res) {
    var comment = req.body.discussion,
        userId = req.session.userId,
        courseId = req.param("id"),
        createTime = moment().unix();

    discussionModel.create({
        "user_id" : userId,
        "comment" : comment,
        "course_id" : courseId,
        "create_time" : createTime
    }).success(function(discussion) {
        if(discussion)
            res.redirect('/course/'+courseId+'/');
        else
            res.redirect('/');
    })
};