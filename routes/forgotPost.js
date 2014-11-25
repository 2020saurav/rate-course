var model = require('../models/index');
var userModel = model.sequelize.models.user;
var helper = require('./helper');

module.exports = function (req, res) {
    var login = req.body.login;
    var email = req.body.email;
    var token = helper.randomToken();
    userModel.findOne({
        where: {"login" : login, "email" : email}
    }).success(function (user) {
        if(user)
        {
            userModel.update({ password_token : token},{
                where : {"login" : login, "email" : email}
            }).success(function(user) {
                if(user)
                {
                    helper.forgotEmail(login);
                    res.render('message', {"message": "We have sent a link to reset your password in your email. Please click the link to reset your password.", "session": req.session})
                }
                else
                {
                    res.render('message', {"message": "Sorry, there was some problem with your login or email. Please try again", "session": req.session})
                }

            });
        }
        else
        {
            res.render('message', {"message": "Sorry, there was some problem with your login or email. Please try again", "session": req.session})
        }
    });

};