var model = require('../models/index');
var moment = require('moment');
var ratingModel = model.sequelize.models.rating;
var ratingValueModel = model.sequelize.models.rating_value;
var reviewModel = model.sequelize.models.review;
var helper = require('./helper');

var ratingId = 0;
module.exports = function (req, res) {


    ratingModel.create({
        user_id: req.session.userId,
        course_offering_id: req.param("offeringId"),
        create_time: moment().unix()
    }).success(function(data){
//        res.send(data);
        ratingId = data.id;
        if(ratingId !== 0){

            if(req.body.courseComment !== null || req.body.profressorComment !== null){
                reviewModel.create({
                    rating_id: ratingId,
                    course_comment: req.body.courseComment,
                    prof_comment: req.body.professorComment
                })

            }
            var object = req.body;


            for(var x in  object )
            {
                if(x !== 'courseComment' && x !== 'professorComment')
                {
                    console.log("1");
                    ratingValueModel.create({
                        rating_id: ratingId,
                        rating_param_id: x,
                        value: object[x]
                    });
                }
            }
            console.log("2");
            helper.reCalculateCourseOfferingRating(res,req.param("offeringId"));
            helper.reCalculateCourseRating(req.param("id"));
        }
    });

}

// TODO here also ensure that rating is not already present!