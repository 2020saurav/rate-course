/* TODO
1. match auth key with username/id in user table. null auth key not allowed
2. set new password
3. remove auth key
4. set session or redirect to login page
 */
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