var model = require('../models/index');
var moment = require('moment');
var spamModel = model.sequelize.models.spam;
var discussionModel = model.sequelize.models.discussion;
module.exports = function(req, res) {
    var discussionId = req.param("discussionId"),
        courseId = req.param("id"),
        userId = req.session.userId;
    spamModel.findOne({
        where: {"user_id" : userId, "type" : 0, "item_id":discussionId }
    }).success(function (spam) {
        if(spam)
        {
            res.send("Already Reported");
        }
        else
        {
            spamModel.create({
                "user_id" : userId,
                "type" : 0,
                "item_id" : discussionId,
                "create_time" : moment().unix()
            }).success(function (spam) {
                if(spam)
                    console.log("Discussion Spam: user "+userId+" course "+courseId+" disc "+ discussionId);
            });
            discussionModel.findOne({
                where : {"id" : discussionId}
            }).success(function(discussion) {
                var count = discussion.spam_flag_count + 1;
                discussionModel.update(
                    {
                        "spam_flag_count" : count
                    },
                    {
                        where : {"id" : discussionId}
                    }).success(function(disc) {
                        if(disc)
                            res.send("Reported");
                            console.log("count increased");
                    })
            });
        }
    });
};