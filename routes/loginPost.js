//set session if valid credentials
var model = require('../models/index');

var userModel = model.sequelize.models.user;

module.exports = function(req, res) {
    var returnURL="/login/";
    if(req.param("returnURL")!=='undefined')
    {
        returnURL = req.body.returnURL;
    }
    userModel.find({
        where: {
            "login" : req.body.login,
            "password" : req.body.password
        }
    }).success(function (result) {
        if(result)
        {
            req.session.user = result.login;
            req.session.userId = result.id;
            req.session.firstName = result.first_name;
            req.session.lastName = result.last_name;
            req.session.photoURL = result.photo_url;
            res.redirect(returnURL);
        }
        else
        {
            res.redirect(returnURL);
            // TODO attach a failure message
        }
    });

};
