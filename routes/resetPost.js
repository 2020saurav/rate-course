var model = require('../models/index');
var sha1 = require('sha1');
var userModel = model.sequelize.models.user;
module.exports = function (req, res) {
    var userId = req.body.userId;
    var token = req.body.token;
    var password = sha1(req.body.password);
    if(token==""||token==null)
    {
        res.render('message',{"session" : req.session, "message" : "Oops! There was error processing your request. There is something wrong with your token. Please try again!"})
    }
    else
    {
        userModel.update({password: password, password_token : "", is_active:true},
            { where:
                {
                    "id" : userId,
                    "password_token" : token
                }
            }
        ).success(function (user) {
                if(user)
                {
                    res.render('message',{"session" : req.session, "message" : "Congratulations! Your password has been updated."})
                }
                else
                {
                    res.render('message',{"session" : req.session, "message" : "Oops! Your password could not be updated. Please try again."})
                }
        });
    }

};