//set session if valid credentials
var model = require('../models/index');

var userModel = model.sequelize.models.user;

module.exports = function(req, res, returnURL) {
    res.send(returnURL);
//    var URL="/";
//    if(returnURL)
//        URL=returnURL;
//    userModel.find({
//        where: {
//            "login" : req.body.login,
//            "password" : req.body.password
//        }
//    }).success(function (result) {
//        if(result)
//        {
//            req.session.user = req.body.login;
//            res.redirect(URL);
//        }
//        else
//        {
//            res.redirect(URL);
//            // TODO attach a failure message
//        }
//    });

};
