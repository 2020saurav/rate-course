var nodemailer = require('nodemailer');
var model = require('../models/index');
var config    = require('../config').server;
var Sequelize = require('sequelize');
var request = require('request');
var ip  = config.ip;
var port = config.port;
var host;
var gmail = require('../config').gmail;
var gmailUser = gmail.user;
var gmailPass = gmail.pass;
var recommenderLink = require('../config').recommender.updateLink;
var courseOfferingRatingParamModel = model.sequelize.models.course_offering_rating_param;
host="http://"+ip;
if(port!=='80')
    host+=":"+port;

var userModel = model.sequelize.models.user;
var transporter = nodemailer.createTransport("SMTP",{
    service: 'Gmail',
    auth: {
        user: gmailUser,
        pass: gmailPass
    }
});

exports.regEmail = function(userLogin)
{
    userModel.find({
        where: {"login" : userLogin}
    }).success(function (user) {
        var userId = user.id;
        var email = user.email;
        var token = user.password_token;
        var name = user.first_name;

        var mailOptions = {
            from: 'Rate Course IITK <rate.course.iitk@gmail.com>',
            to: email,
            subject: 'Rate My Course: Complete your registration!',
            text: 'Welcome ' + name+ '\n \nYour email id has been used to register at Course Rate IITK. Please use this link '
                + host+'/reset/?u='+userId+'&token='+token +' to reset your password.\n\n--\nAdmin',
            html: 'Welcome ' + name+'!<br>'+
                'Your email id has been used to register at Course Rate IITK.' +
                ' Please <a href="'+host+'/reset/?u='+userId+'&token='+token + '">click here</a> ' +
                'to reset your password.<br><br>'+
                '--<br>Admin'
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error)
            {
                console.log(error);
            }
            else
            {
                console.log(
                        "Sent: \nFrom: " + mailOptions.from +
                        "\nTo: "+ mailOptions.to +
                        "\n Subject: "+ mailOptions.subject+
                        "\n Body: "+ mailOptions.text+
                        "\n HTML: "+ mailOptions.html
                );
            }
        });
    });
};

exports.forgotEmail = function(userLogin)
{
    userModel.find({
        where: {"login" : userLogin}
    }).success(function (user) {
        var userId = user.id;
        var email = user.email;
        var token = user.password_token;
        var name = user.first_name;

        var mailOptions = {
            from: 'Rate Course IITK <rate.course.iitk@gmail.com>',
            to: email,
            subject: 'Rate My Course: Reset your password!',
            text: 'Hi ' + name+ '!\n \nYou have requested to change your password. Please use this link '
                + host+'/reset/?u='+userId+'&token='+token +' to reset your password.\n\n--\nAdmin',
            html: 'Hi ' + name+'!<br>'+
                'You have requested to change your password.' +
                ' Please <a href="'+host+'/reset/?u='+userId+'&token='+token + '">click here</a> ' +
                'to reset your password.<br><br>'+
                '--<br>Admin'
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error)
            {
                console.log(error);
            }
            else
            {
                console.log(
                        "Sent: \nFrom: " + mailOptions.from +
                        "\nTo: "+ mailOptions.to +
                        "\n Subject: "+ mailOptions.subject+
                        "\n Body: "+ mailOptions.text+
                        "\n HTML: "+ mailOptions.html
                );
            }
        });
    });
};

exports.reCalculateCourseOfferingRating = function(res,courseOfferingId, courseId)
{


    var ratingModel = model.sequelize.models.rating;
    var ratingValueModel = model.sequelize.models.rating_value;
    var cumulativeRatingValueModel = model.sequelize.models.cumulative_rating_value;
    var courseOfferingModel = model.sequelize.models.course_offering;

var avg, rpi;
    ratingModel.findAll({
        where : {"course_offering_id" : courseOfferingId},
        attributes: ['id']
    }).success(function (ratings) {
        var ratingIds =[];
        for (var i=0; i<ratings.length; i++)
        {
            ratingIds.push(ratings[i].id);
        }
        model.sequelize.query('select rating_param_id, avg(value) as average from rating_value WHERE rating_id in ('+ ratingIds +') group by rating_param_id').success(function(rows) {
            for(var i=0; i<rows.length; i++)
            {
                avg = rows[i].average;
                rpi = rows[i].rating_param_id;
                (function(avg,rpi)
                {
                    // Javascript, you have lost my respect now! Had it not been for S.O., this had no future -_-
                    avg = rows[i].average;
                    rpi = rows[i].rating_param_id;
                    if(rpi!==0)
                    {

                        cumulativeRatingValueModel.findAll({
                            where: {
                                "course_offering_id": courseOfferingId,
                                "rating_param_id": rpi
                            }
                        }).success(function (crvs) {
                            if (crvs.length == 0)    // create if not exists
                            {
                                cumulativeRatingValueModel.create(
                                    {
                                        "course_offering_id": courseOfferingId,
                                        "rating_param_id": rpi,
                                        "value": avg
                                    })
                            }
                            else {                          // update if exists
                                cumulativeRatingValueModel.update(
                                    {
                                        "value": avg
                                    },
                                    {
                                        where: {
                                            "course_offering_id": courseOfferingId,
                                            "rating_param_id": rpi
                                        }
                                    })
                            }
                        });
                    }

                    if(rpi==1)  // this is assumed to be main question to judge a course
                    {
                        courseOfferingModel.update(
                        {
                            "overall_rating" : avg
                        },
                        {
                            where: {"id": courseOfferingId}
                        }).success(function(){
                               reCalculateCourseRating(courseId);
                            });
                    }
                })(i);
            }
        })
    });
};

function reCalculateCourseRating(courseId) {
    var courseModel = model.sequelize.models.course;
    model.sequelize.query('select avg(overall_rating) as average from course_offering WHERE course_id = ' + courseId + ' and overall_rating>=0').success(function (overall_average) {
        var avg = overall_average[0].average;
        console.log("Average = " + avg);
        courseModel.update({
                "overall_rating": avg
            },
            {
                where: {"id": courseId}
            });
    });

};

exports.updateVisualizationCount = function(courseOfferingId, ratingValue1, ratingValue2) {
    var visualizationModel = model.sequelize.models.visualization;
    visualizationModel.findAll({
        where: {
            "course_offering_id": courseOfferingId
        }
    }).success(function (entry) {
        console.log("ratingValue1 = " + ratingValue1 + "  ratingvalue2 = " + ratingValue2);
        if (entry.length == 0)    // create if not exists
        {   console.log("creating entry  ");
            visualizationModel.create(
                {
                    "course_offering_id": courseOfferingId
                }).success(function(){
                    console.log("updating table");
                    if (ratingValue1 <= 1) {
                        visualizationModel.findOne({
                            where: {"course_offering_id": courseOfferingId}
                        }).success(function (result) {
                            var count = result.q1_count1;
                            visualizationModel.update({
                                q1_count1: count + 1
                            }, {
                                where: {"course_offering_id": courseOfferingId}
                            });

                        });
                    }
                    else if (ratingValue1 > 1 && ratingValue1 <= 2) {
                        visualizationModel.findOne({
                            where: {"course_offering_id": courseOfferingId}
                        }).success(function (result) {
                            var count = result.q1_count2;
                            visualizationModel.update({
                                q1_count2: count + 1
                            }, {
                                where: {"course_offering_id": courseOfferingId}
                            });

                        });
                    }
                    else if (ratingValue1 > 2 && ratingValue1 <= 3) {
                        visualizationModel.findOne({
                            where: {"course_offering_id": courseOfferingId}
                        }).success(function (result) {
                            var count = result.q1_count3;
                            visualizationModel.update({
                                q1_count3: count + 1
                            }, {
                                where: {"course_offering_id": courseOfferingId}
                            });

                        });
                    }
                    else if (ratingValue1 > 3 && ratingValue1 <= 4) {
                        visualizationModel.findOne({
                            where: {"course_offering_id": courseOfferingId}
                        }).success(function (result) {
                            var count = result.q1_count4;
                            visualizationModel.update({
                                q1_count4: count + 1
                            }, {
                                where: {"course_offering_id": courseOfferingId}
                            });

                        });

                    }
                    else if (ratingValue1 > 4 && ratingValue1 <= 5) {
                        console.log("entered q1 count5");
                        visualizationModel.findOne({
                            where: {"course_offering_id": courseOfferingId}
                        }).success(function (result) {
                            var count = result.q1_count5;
                            visualizationModel.update({
                                q1_count5: count + 1
                            }, {
                                where: {"course_offering_id": courseOfferingId}
                            });

                        });
                    }
                    if (ratingValue2 <= 1) {
                        visualizationModel.findOne({
                            where: {"course_offering_id": courseOfferingId}
                        }).success(function (result) {
                            var count = result.q2_count1;
                            visualizationModel.update({
                                q2_count1: count + 1
                            }, {
                                where: {"course_offering_id": courseOfferingId}
                            });

                        });
                    }
                    else if (ratingValue2 > 1 && ratingValue2 <= 2) {
                        visualizationModel.findOne({
                            where: {"course_offering_id": courseOfferingId}
                        }).success(function (result) {
                            var count = result.q2_count2;
                            visualizationModel.update({
                                q2_count2: count + 1
                            }, {
                                where: {"course_offering_id": courseOfferingId}
                            });

                        });
                    }
                    else if (ratingValue2 > 2 && ratingValue2 <= 3) {
                        visualizationModel.findOne({
                            where: {"course_offering_id": courseOfferingId}
                        }).success(function (result) {
                            var count = result.q2_count3;
                            visualizationModel.update({
                                q2_count3: count + 1
                            }, {
                                where: {"course_offering_id": courseOfferingId}
                            });

                        });
                    }
                    else if (ratingValue2 > 3 && ratingValue2 <= 4) {
                        visualizationModel.findOne({
                            where: {"course_offering_id": courseOfferingId}
                        }).success(function (result) {
                            var count = result.q2_count4;
                            visualizationModel.update({
                                q2_count4: count + 1
                            }, {
                                where: {"course_offering_id": courseOfferingId}
                            });

                        });
                    }
                    else if (ratingValue2 > 4 && ratingValue2 <= 5) {
                        console.log("entered q2 count5");
                        visualizationModel.findOne({
                            where: {"course_offering_id": courseOfferingId}
                        }).success(function (result) {
                            var count = result.q2_count5;
                            visualizationModel.update({
                                q2_count5: count + 1
                            }, {
                                where: {"course_offering_id": courseOfferingId}
                            });

                        });
                    }
                });
        }
        else {
            console.log("updating table");
            if (ratingValue1 <= 1) {
                visualizationModel.findOne({
                    where: {"course_offering_id": courseOfferingId}
                }).success(function (result) {
                    var count = result.q1_count1;
                    visualizationModel.update({
                        q1_count1: count + 1
                    }, {
                        where: {"course_offering_id": courseOfferingId}
                    });

                });
            }
            else if (ratingValue1 > 1 && ratingValue1 <= 2) {
                visualizationModel.findOne({
                    where: {"course_offering_id": courseOfferingId}
                }).success(function (result) {
                    var count = result.q1_count2;
                    visualizationModel.update({
                        q1_count2: count + 1
                    }, {
                        where: {"course_offering_id": courseOfferingId}
                    });

                });
            }
            else if (ratingValue1 > 2 && ratingValue1 <= 3) {
                visualizationModel.findOne({
                    where: {"course_offering_id": courseOfferingId}
                }).success(function (result) {
                    var count = result.q1_count3;
                    visualizationModel.update({
                        q1_count3: count + 1
                    }, {
                        where: {"course_offering_id": courseOfferingId}
                    });

                });
            }
            else if (ratingValue1 > 3 && ratingValue1 <= 4) {
                visualizationModel.findOne({
                    where: {"course_offering_id": courseOfferingId}
                }).success(function (result) {
                    var count = result.q1_count4;
                    visualizationModel.update({
                        q1_count4: count + 1
                    }, {
                        where: {"course_offering_id": courseOfferingId}
                    });

                });

            }
            else if (ratingValue1 > 4 && ratingValue1 <= 5) {
                console.log("entered q1 count5");
                visualizationModel.findOne({
                    where: {"course_offering_id": courseOfferingId}
                }).success(function (result) {
                    var count = result.q1_count5;
                    visualizationModel.update({
                        q1_count5: count + 1
                    }, {
                        where: {"course_offering_id": courseOfferingId}
                    });

                });
            }
            if (ratingValue2 <= 1) {
                visualizationModel.findOne({
                    where: {"course_offering_id": courseOfferingId}
                }).success(function (result) {
                    var count = result.q2_count1;
                    visualizationModel.update({
                        q2_count1: count + 1
                    }, {
                        where: {"course_offering_id": courseOfferingId}
                    });

                });
            }
            else if (ratingValue2 > 1 && ratingValue2 <= 2) {
                visualizationModel.findOne({
                    where: {"course_offering_id": courseOfferingId}
                }).success(function (result) {
                    var count = result.q2_count2;
                    visualizationModel.update({
                        q2_count2: count + 1
                    }, {
                        where: {"course_offering_id": courseOfferingId}
                    });

                });
            }
            else if (ratingValue2 > 2 && ratingValue2 <= 3) {
                visualizationModel.findOne({
                    where: {"course_offering_id": courseOfferingId}
                }).success(function (result) {
                    var count = result.q2_count3;
                    visualizationModel.update({
                        q2_count3: count + 1
                    }, {
                        where: {"course_offering_id": courseOfferingId}
                    });

                });
            }
            else if (ratingValue2 > 3 && ratingValue2 <= 4) {
                visualizationModel.findOne({
                    where: {"course_offering_id": courseOfferingId}
                }).success(function (result) {
                    var count = result.q2_count4;
                    visualizationModel.update({
                        q2_count4: count + 1
                    }, {
                        where: {"course_offering_id": courseOfferingId}
                    });

                });
            }
            else if (ratingValue2 > 4 && ratingValue2 <= 5) {
                console.log("entered q2 count5");
                visualizationModel.findOne({
                    where: {"course_offering_id": courseOfferingId}
                }).success(function (result) {
                    var count = result.q2_count5;
                    visualizationModel.update({
                        q2_count5: count + 1
                    }, {
                        where: {"course_offering_id": courseOfferingId}
                    });

                });
            }
        }

    });

};

exports.updateRecommendationSystemData = function (user_id, course_id, value) {
    request.get(recommenderLink+"?user_id="+user_id+"&course_id="+course_id+"&value="+value);
};
exports.getParentFromTag = function(tag)
{
    tag = tag.toLocaleLowerCase();
    tag = tag.trim();
    tag = tag.split(" ");
    var parentTags = ["CSE","EE","CE","ME","BSBE","CHE","AE","MTH","MSE","PHY","CHM",
        "HSS","IME","CS201","CS202","CS203","CS330","CS340","CS345","CS210"];
    var tagArray = [
        [ "CSE","computer","dabba"],
        ["EE","batti" ,"electrical"],
        ["CE","civil","building","boom"],
        ["ME","mech"],
        ["BSBE","bio" , "biology" ],
        ["CHE","chemical"],
        ["AE","aero" ],
        ["MTH","maths","math"],
        ["MSE","matti","material"],
        ["PHY","physics"],
        ["CHM","chemistry"],
        ["HSS","humanities","social science"],
        ["IME","industrial","management"],
        ["CS201","discrete","maths"],
        ["CS202","logic","abstract","algebra"],
        ["CS203","abstract","algebra"],
        ["CS330", "os","unix","nachos"],
        ["CS340","toc","turing","automata"],
        ["CS345","algo2","algorithm","advanced algorithms","algo","algorithms"],
        ["CS210","algorithm","algo","algorithms","data","data structure"]

    ];
    for (var k = tag.length - 1; k >= 0; k--) {
        for (var i = tagArray.length - 1; i >= 0; i--) {
            for (var j = tagArray[i].length - 1; j >= 0; j--) {
                if (tagArray[i][j]==tag[k])
                    return parentTags[i];
            }
        }
    }
    return tag[0];
};

exports.feedbackEmailReceipt = function(userEmail)
{
    userModel.find({
        where: {"email" : userEmail}
    }).success(function (user) {
        var email = user.email;
        var name = user.first_name;

        var mailOptions = {
            from: 'Rate Course IITK <rate.course.iitk@gmail.com>',
            to: email,
            subject: 'Rate My Course: Thank You for your feedback',
            text: 'Hi ' + name+ '!\n \n Your feedback is highly appreciated and will help us to improve our ability to serve you and other users of our web site.'
                +'\n\n--\nAdmin',
            html: 'Hi ' + name+'!<br>'+
                'Your feedback is highly appreciated and will help us to improve our ability to serve you and other users of our web site. <br> --<br> Admin'
        };
        transporter.sendMail(mailOptions, function(error, info){
            if(error)
            {
                console.log(error);
            }
            else
            {
                console.log(
                        "Sent: \nFrom: " + mailOptions.from +
                        "\nTo: "+ mailOptions.to +
                        "\n Subject: "+ mailOptions.subject+
                        "\n Body: "+ mailOptions.text+
                        "\n HTML: "+ mailOptions.html
                );
            }
        });
    });
};

exports.feedbackEmailAdmin = function(userEmail,feedback,time)
{
    var mailOptions = {
        from: 'Rate Course IITK <rate.course.iitk@gmail.com>',
        to: '2020saurav@gmail.com',
        subject: 'Feedback on Rate My Course',
        text: '',
        html:
            '<b>Feedback</b>' +
            '<br> Email : ' + userEmail +
            '<br> Feedback : ' + feedback +
             '<br> Time : ' + time
    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error)
        {
            console.log(error);
        }
        else
        {
            console.log(
                    "Sent: \nFrom: " + mailOptions.from +
                    "\nTo: "+ mailOptions.to +
                    "\n Subject: "+ mailOptions.subject+
                    "\n Body: "+ mailOptions.text+
                    "\n HTML: "+ mailOptions.html
            );
        }
    });
};

exports.randomToken = function()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    for( var i=0; i < 8; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    return text;
};

exports.meetApprovedUserEmail = function(userEmail,userName,professor,date,time,message)
{
    var mailOptions = {
        from: 'Rate Course IITK <rate.course.iitk@gmail.com>',
        to: userEmail,
        subject: 'Professor Meeting Request Approved',
        text: 'Dear '+userName+'!\n Professor '+professor+' has accepted your meeting Request. Here are the details:'+
        '\nMessage: '+message+
        '\nDate: ' + date +
        '\n Time: '+time+
        '\n\n--\nAdmin',
        html:
            'Dear <b>'+userName+'</b>!<br> Professor '+professor+' has accepted your meeting Request. Here are the details:'+
            '<br>Message: '+message+
            '<br>Date: ' + date +
            '<br> Time: '+time+
            '<br><br>--<br>Admin'

    };
    transporter.sendMail(mailOptions, function(error, info){
        if(error)
        {
            console.log(error);
        }
        else
        {
            console.log(
                    "Sent: \nFrom: " + mailOptions.from +
                    "\nTo: "+ mailOptions.to +
                    "\n Subject: "+ mailOptions.subject+
                    "\n Body: "+ mailOptions.text+
                    "\n HTML: "+ mailOptions.html
            );
        }
    });
};
exports.insertDefaultRatingParams= function(course_offering_id)
{
    courseOfferingRatingParamModel.create({
        course_offering_id: course_offering_id,
        rating_param_id: 1,
        weight: 100,
        max_value: 5
    }).success(function(data){
        console.log("Table CORP : Entry Added");
        courseOfferingRatingParamModel.create({
            course_offering_id: course_offering_id,
            rating_param_id: 2,
            weight: 100,
            max_value: 5
        }).success(function(data){
            console.log("Table CORP : Entry Added");
            courseOfferingRatingParamModel.create({
                course_offering_id: course_offering_id,
                rating_param_id: 3,
                weight: 100,
                max_value: 5
            }).success(function(data){
                console.log("Table CORP : Entry Added");
                courseOfferingRatingParamModel.create({
                    course_offering_id: course_offering_id,
                    rating_param_id: 4,
                    weight: 100,
                    max_value: 5
                }).success(function(data){
                    console.log("Table CORP : Entry Added");
                    courseOfferingRatingParamModel.create({
                        course_offering_id: course_offering_id,
                        rating_param_id: 5,
                        weight: 100,
                        max_value: 5
                    }).success(function(data){
                        console.log("Table CORP : Entry Added");
                        courseOfferingRatingParamModel.create({
                            course_offering_id: course_offering_id,
                            rating_param_id: 6,
                            weight: 100,
                            max_value: 5
                        }).success(function(data){
                            console.log("Table CORP : Entry Added");
                            courseOfferingRatingParamModel.create({
                                course_offering_id: course_offering_id,
                                rating_param_id: 7,
                                weight: 100,
                                max_value: 5
                            }).success(function(data){
                                console.log("Table CORP : Entry Added");
                                courseOfferingRatingParamModel.create({
                                    course_offering_id: course_offering_id,
                                    rating_param_id: 8,
                                    weight: 100,
                                    max_value: 5
                                }).success(function(data){
                                    console.log("Table CORP : Entry Added");
                                    var visualizationModel = model.sequelize.models.visualization;
                                    visualizationModel.create({
                                        course_offering_id: course_offering_id
                                    }).success(function(visualization) {
                                        console.log("Visualization Entry added")
                                    })
                                });
                            });
                        });
                    });
                });
            });
        });
    });

};
