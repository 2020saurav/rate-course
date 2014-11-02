var model = require('../models/index');
var fs = require('fs');
var userModel = model.sequelize.models.user;

module.exports = function(req, res) {
    res.send(req.files);
    console.log(req.files);
//    fs.readFile(req.files.profilePic.path, function (err, data) {
//        var imageName = req.files.image.name;
//        res.send(imageName);
//        console.log(imageName);
//        console.log(err);
//        console.log(data);
//    })

};