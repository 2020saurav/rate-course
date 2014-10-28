//set session if valid credentials
var model = require('../models/index');

var userModel = model.sequelize.models.user;

module.exports = function(req, res) {

    var returnURL="/";
    userModel.find({
        where: {
            "login" : req.body.login,
            "password" : req.body.password
        }
    }).success(function (result) {
        if(result)
        {
            req.session.user = req.body.login;
            res.redirect(returnURL);
        }
        else
        {
            res.redirect(returnURL);
            // TODO attach a failure message
        }
    });

};
