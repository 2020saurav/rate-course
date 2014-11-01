var model = require('../models/index');
var URL = require('url');
var userModel = model.sequelize.models.user;

module.exports = function (req, res) {
    var urlParse = URL.parse(req.url, true);
    var userId = urlParse.query.u;
    var token = urlParse.query.token;
    if(token=="")
    {
        res.render('message',{"session" : req.session, "message" : "Oops! There was error processing your request. There is something wrong with your token. Please try again!"})
    }
    userModel.find({
        where : {
            "id" : userId,
            "password_token" : token
        }
    }).success(function(user){
        if(user)
            res.render('reset',{"session":req.session, "token": token, "userId":userId, "login" : user.login});
        else
            res.render('message',{"session" : req.session, "message" : "Oops! There was error processing your request. There is something wrong with your token. Please try again!"})
    });

};