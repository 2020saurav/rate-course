var model = require('../models/index');
var meetProfessorModel = model.sequelize.models.meet_professor;

module.exports = function(req, res) {
    var reply = req.body.reply;
    var time = req.body.time;
    meetProfessorModel.update({
            "status" :3,
            "professor_reply" : reply,
            "approved_time" : time
        },
        { where: {id: req.param("id")}
        }).success(function(info){
            console.log("Meet updated");
            res.redirect('/faculty/');
        });
};