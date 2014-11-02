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
    ratingModel.findAll({
        where : {"course_offering_id" : courseOfferingId},
        attributes: ['id']
    }).success(function (ratings) {
        var ratingIds =[];
        for (var i=0; i<ratings.length; i++)
        {
            ratingIds.push(ratings[i].id);
        }
        ratingValueModel.findAll({
            where : {rating_id : ratingIds},
            attributes : [

                'rating_param_id',
                [Sequelize.fn('avg',Sequelize.col('value')),'average']
            ],
            group : ["rating_param_id"]


        }).success(function(ratingValues) {
            res.send(ratingValues)
/*
 Table.findAll({
 attributes: [
                    'column1',
                    sequelize.fn('count', sequelize.col('column2'))
            ],
 group: [
                "Table.column1"
       ]
     }).success(function (result) { });

 */
        });
//        res.send(ratingIds);

    });
    // go to rating table. find all ratings with this course_offering_id : carry along the ids
    // go to rating_values table select those having above rating_ids
    // group by rating_param_id
    // get average of each group
    // create/update this value in cumulative_rating_table

};

exports.reCalculateCourseRating = function(courseId)
{

}


exports.getParentFromTag = function(tag)
{
    var parentTags = ["CSE","EE","CE"];
    var tagArray = [
            [ "Computer", "computer"],
            ["Batti" , "batti" , "Electrical" ,"electrical"],
            ["Civil","civil","building","Building","BOOM"]
        ];
    for (var i = tagArray.length - 1; i >= 0; i--)
    {
        for (var j = tagArray[i].length - 1; j >= 0; j--)
        {
            if (tagArray[i][j]==tag)
                return parentTags[i];
        }
    }

    return tag;
};
