var model = require('../models/index');
var moment = require('moment');
var spamModel = model.sequelize.models.spam;
var reviewModel = model.sequelize.models.review;
module.exports = function(req, res) {
    var reviewId = req.param("reviewId"),
        userId = req.session.userId;
    spamModel.findOne({
        where: {"user_id" : userId, "type" : 1, "item_id":reviewId }
    }).success(function (spam) {
        if(spam)
        {
            res.send("Already Reported");
        }
        else
        {
            spamModel.create({
                "user_id" : userId,
                "type" : 1,
                "item_id" : reviewId,
                "create_time" : moment().unix()
            }).success(function (spam) {
                if(spam)
                    console.log("Review Spam: user "+userId + " review "+reviewId);
            });
            reviewModel.findOne({
                where : {"id" : reviewId}
            }).success(function(review) {
                var count = review.spam_flag_count + 1;
                reviewModel.update(
                    {
                        "spam_flag_count" : count
                    },
                    {
                        where : {"id" : reviewId}
                    }).success(function(rev) {
                        if(rev)
                            res.send("Reported");
                        console.log("count increased");
                    })
            });
        }
    });
};