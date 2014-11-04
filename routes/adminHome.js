var model = require('../models/index');
var moment = require('moment');

var discussionModel = model.sequelize.models.discussion;
var reviewModel = model.sequelize.models.review;

var discussionSpams, reviewSpams;
// select top 10 each which are not already deleted.
module.exports = function (req, res) {
    discussionModel.findAll({
        where: ["is_deleted = ?", 0],
        limit: 10,
        order: 'spam_flag_count DESC'
    }).success(function (discussions) {
        discussionSpams = discussions;
        reviewModel.findAll({
            where: ["is_deleted = ?", 0],
            limit: 10,
            order: 'spam_flag_count DESC'
        }).success(function (reviews) {
            reviewSpams = reviews;
            res.render('admin/admin',{"discussionSpams": discussionSpams, "reviewSpams": reviewSpams, "session" : req.session});
        });
    });
};

