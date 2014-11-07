var model = require('../models/index');
var meetProfessorModel = model.sequelize.models.meet_professor;

module.exports = function(req, res) {
    var reply = req.body.reply;
    meetProfessorModel.update({
            "status" :2,
            "professor_reply" : reply
        },
        { where: {id: req.param("id")}
        }).success(function(info){
            // TODO send email
            console.log("Meet updated");
            res.redirect('/faculty/');
        });
};