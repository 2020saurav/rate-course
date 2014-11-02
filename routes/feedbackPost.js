var model = require('../models/index');
var userModel = model.sequelize.models.user;

// TODO send email to admin regarding this feedback
module.exports = function (req, res) {
    res.send(req.body);
};