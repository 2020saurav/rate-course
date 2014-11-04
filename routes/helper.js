var nodemailer = require('nodemailer');
var model = require('../models/index');
var config    = require('../config').server;
var Sequelize = require('sequelize');
var ip  = config.ip;
var port = config.port;
var host;

host="http://"+ip;
if(port!=80)
    host+=":"+port;

var userModel = model.sequelize.models.user;
var transporter = nodemailer.createTransport("SMTP",{
    service: 'Gmail',
    auth: {
        user: 'rate.course.iitk@gmail.com',
        pass: 'rate.course.iitk2014'
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

exports.reCalculateCourseOfferingRating = function(res,courseOfferingId)
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
                        });
                    }
                })(i);
            }
        })
    });
};

exports.reCalculateCourseRating = function(courseId) {
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
exports.getParentFromTag = function(tag)
{
    tag = tag.toLocaleLowerCase();
    tag = tag.trim();
    tag = tag.split(" ");
    var parentTags = ["CSE","EE","CE","BSBE","CHE","AE","MTH","MSE","PHY","CHM","HSS","IME"];
    var tagArray = [
        [ "computer"],
        ["batti" ,"electrical"],
        ["civil","building","boom"],
        ["bio" , "biology" ],
        ["chemical"],
        [ "aero" ],
        ["maths","math"],
        ["matti","material"],
        ["physics"],
        ["chemistry"],
        ["humanities","social science"],
        ["industrial","management"]
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
