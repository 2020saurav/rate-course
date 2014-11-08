var model = require('../models/index');
var moment = require('moment');
var ratingModel = model.sequelize.models.rating;
var ratingValueModel = model.sequelize.models.rating_value;
var reviewModel = model.sequelize.models.review;
var helper = require('./helper');

var ratingId = 0;
module.exports = function (req, res) {
    var returnURL;
    returnURL="/course/"+req.param("id")+"/"+req.param("offeringId") + "/";

    ratingModel.findOne({
        where : {
            user_id: req.session.userId,
            course_offering_id: req.param("offeringId")
        }
    }).success(function(rating) {
        if(rating)
        {
            // already rated this offering by this user
            res.redirect(returnURL);
        }
        else
        {
            var as_anon = false;
            if(req.body.asAnon)
                as_anon = true;
            ratingModel.create({
                user_id: req.session.userId,
                course_offering_id: req.param("offeringId"),
                create_time: moment().unix(),
                as_anon : as_anon
            }).success(function(data){
                ratingId = data.id;
                if(ratingId !== 0)
                {
                    reviewModel.create({
                        rating_id: ratingId,
                        course_comment: req.body.courseComment,
                        prof_comment: req.body.professorComment
                    });

                    var object = req.body;
                    var value1, value2;
                    for(var x in  object )
                    {
                        (function(x) {
                            if (x !== 'courseComment' && x !== 'professorComment' && x !== 0 && x!=='0') { // still x becomes 0 :'(
                                ratingValueModel.create({
                                    rating_id: ratingId,
                                    rating_param_id: x,
                                    value: object[x]
                                });
                            }
                            if(x == 1)
                                value1 = object[x];
                            if(x == 2)
                                value2 = object[x];
                        })(x);
                    }
                    var name1 = 1, name2 = 2;
                    helper.reCalculateCourseOfferingRating(res,req.param("offeringId"),req.param("id"));
//                    helper.reCalculateCourseRating(req.param("id"));
                    helper.updateVisualizationCount(req.param("offeringId"), value1, value2 );
                    var course_id = req.param("id");
                    var user_id = req.session.userId;
                    helper.updateRecommendationSystemData(user_id,course_id,value1);
                    res.redirect(returnURL);
                }
                else
                {
                    res.redirect(returnURL);
                }
            });
        }
    });
};
