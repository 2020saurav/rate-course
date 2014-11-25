var model = require('../models/index');
var moment = require('moment');
var discussionModel = model.sequelize.models.discussion;

module.exports = function(req, res) {
    var comment = req.body.discussion,
        userId = req.session.userId,
        courseId = req.param("id"),
        createTime = moment().unix(),
        as_anon = false;

    discussionModel.count({
        where :
        {
            "user_id" : userId,
            "course_id" : courseId
        }
    }).success(function(count){
        if(count>4)
        {
            res.render("message",{"session":req.session, "message":"You have reached maximum posting limit on this course."})
        }
        else
        {
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
        }
    });
};