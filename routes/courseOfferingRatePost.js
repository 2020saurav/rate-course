var model = require('../models/index');
var moment = require('moment');
var ratingModel = model.sequelize.models.rating;
var ratingValueModel = model.sequelize.models.rating_value;
var reviewModel = model.sequelize.models.review;
var helper = require('./helper');

var ratingId = 0;
module.exports = function (req, res) {
    var returnURL;
    ratingModel.create({
        user_id: req.session.userId,
        course_offering_id: req.param("offeringId"),
        create_time: moment().unix()
    }).success(function(data){
        ratingId = data.id;
        if(ratingId !== 0)
        {
//            var courseComment = req.body.courseComment,
//                professorComment = req.body.professorComment;
//
//            if((courseComment && courseComment!==null && courseComment !== "")
//                || (professorComment && professorComment !== null && professorComment !== ""))
//            {
            reviewModel.create({
                rating_id: ratingId,
                course_comment: req.body.courseComment,
                prof_comment: req.body.professorComment
            });

//            }
            var object = req.body;
            for(var x in  object )
            {
                if(x !== 'courseComment' && x !== 'professorComment')
                {
                    ratingValueModel.create({
                        rating_id: ratingId,
                        rating_param_id: x,
                        value: object[x]
                    });
                }
            }
            helper.reCalculateCourseOfferingRating(res,req.param("offeringId"));
            helper.reCalculateCourseRating(req.param("id"));
            returnURL="/course/"+req.param("id")+"/"+req.param("offeringId") + "/";
            res.redirect(returnURL);
        }
        else
        {
            returnURL="/course/"+req.param("id")+"/"+req.param("offeringId") + "/";
            res.redirect(returnURL);
        }
    });
};
// TODO here also ensure that rating is not already present!