var JSFtp = require('jsftp');
var helper = require('./helper');
var model = require('../models/index');

var userModel = model.sequelize.models.user;

module.exports = function (req, res) {
    var cclogin = req.body.login;
    var ccpassword = req.body.password;

    var Ftp = new JSFtp({
        host: "webhome.cc.iitk.ac.in",
        port: 21
    });
    Ftp.auth(cclogin,ccpassword,function(err) {
        if(err)
        {
            res.render('message',{"message":"Oops! Seems that your CC Login and CC Password did not match. Please try again", "session":req.session})
        }
        else
        {
            userModel.findOne({
                    where: {'login': cclogin}
                }
            ).success(function(user){
                if(user)
                {
                    res.render('message',{"message":"Oops! This login is already registered. If you have not registered, please drop us a mail. If you forgotten your password, use 'Forgot Password'", "session":req.session})
                }
                else
                {
                    var token=helper.randomToken();
                    userModel.create({
                        login : cclogin,
                        password : helper.randomToken(), // save another random string
                        email : cclogin+"@iitk.ac.in",
                        first_name : cclogin,
                        is_active : false,
                        password_token : token
                    }).success(function(user){
                        if (user)
                        {
                            helper.regEmail(cclogin);
                            res.render('message', {"message": "Congratulations! Your account has been created. We have sent you a link in your email to reset your password. Please click the link and complete your registration. In case you have not received the email, please look into other folders of your inbox.", "session": req.session})
                        }
                        else
                        {
                            res.render('message', {"message": "Oops! There was some problem processing your request. Please try again. Contact us, if the problem persists.", "session": req.session});
                            console.log(err);
                        }
                    });
                }
            });
        }
    })
};