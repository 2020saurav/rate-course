var model = require('../models/index');
var userModel = model.sequelize.models.user;

module.exports = function (req, res) {
    var firstName = req.body.firstName;
    var lastName = req.body.lastName;
    userModel.update(
        {"first_name":firstName, "last_name":lastName},
        {where : {"id" :req.session.userId}}
    ).success(function (user) {
            req.session.firstName = firstName;
            req.session.lastName = lastName;
            res.redirect('/user/'+req.session.user+'/');
    })
};