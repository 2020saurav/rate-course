var model = require('../models/index');
var userModel = model.sequelize.models.user;
var moment = require('moment');
var helper = require('./helper');

module.exports = function (req, res) {
    var feedback = req.body.feedback,
        userEmail = req.session.user + "@iitk.ac.in",
        time = moment().format("DD-MMM-YYYY HH:MM");
    helper.feedbackEmailReceipt(userEmail);
    helper.feedbackEmailAdmin(userEmail,feedback,time);
    res.render('message',{"message" : "Thank You for submitting your feedback!", "session":req.session})
};