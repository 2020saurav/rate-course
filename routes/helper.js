var nodemailer = require('nodemailer');
var model = require('../models/index');
var config    = require('../config').server;
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
