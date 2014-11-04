var model = require('../models/index');
var userModel = model.sequelize.models.user;

module.exports = function (req, res) {
    userModel.findOne({
        where : {"login":req.session.user}
    }).success(function(user){
        if(user)
            res.render('updateProfile',{"session":req.session, "user": user});
        else
            res.render('404',{"session":req.session})
    });
};