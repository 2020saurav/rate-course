var model = require('../models/index');
var moment = require('moment');
var discussionModel = model.sequelize.models.discussion;

module.exports = function(req, res) {
    var comment = req.body.discussion,
        userId = req.session.userId,
        courseId = req.param("id"),
        createTime = moment().unix(),
        as_anon = false;
    if(req.body.asAnon)
        as_anon = true;
    if(comment!==null && comment && comment!== "") {
        discussionModel.create({
            "user_id": userId,
            "comment": comment,
            "course_id": courseId,
            "create_time": createTime,
            "as_anon": as_anon
        }).success(function (discussion) {
            if (discussion)
                res.redirect('/course/' + courseId + '/');
            else
                res.redirect('/');
        })
    }
    else
    {
        res.redirect('/course/' + courseId + '/');
    }
};