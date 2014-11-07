var request = require('request');
var model = require('../models/index');
var recommendedLink = require('../config').recommender.getLink;
var courseModel = model.sequelize.models.course;

module.exports = function (req, res) {
    var url = recommendedLink+"?user_id="+req.session.userId;
    var courseIds=[];

    var i=0;
    request({
        url : url,
        json : true
    }, function(error, response, courses) {
        if(courses)
        {
            for(i=0; i<courses.length; i++)
            {
                courseIds.push(courses[i]);
            }
            courseModel.findAll({
                where:{"id" : courseIds},
                order : 'FIELD(id,'+courseIds+')'
            }).success(function(courses) {
                res.render('recommendedCourses',{"session":req.session,"courses" : courses})
            });
        }
        else
        {
            res.redirect('/courses/');
        }
    });
};