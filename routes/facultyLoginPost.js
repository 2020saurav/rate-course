//set session if valid credentials
var model = require('../models/index');
var sha1 = require('sha1');

var professorModel = model.sequelize.models.professor;

module.exports = function(req, res) {
    var returnURL="/faculty/login/";
    if(req.param("returnURL")!=='undefined')
    {
        returnURL = req.body.returnURL;
    }
    professorModel.find({
        where: {
            "login" : req.body.login,
            "password" : sha1(req.body.password)
        }
    }).success(function (result) {
        if(result)
        {
            req.session.user = result.login;
            req.session.userId = result.id;
            req.session.firstName = result.first_name;
            req.session.lastName = result.last_name;
            req.session.photoURL = result.photo_url;
            req.session.role = "faculty";
            res.redirect(returnURL);
        }
        else
        {
            res.redirect(returnURL);
            // TODO attach a failure message
        }
    });

};
