var model = require('../models/index');
var meetProfessorModel = model.sequelize.models.meet_professor;

module.exports = function(req, res) {
    var reply = req.body.reply;
    var time = req.body.time;
    var date = req.body.date;
    meetProfessorModel.update({
            "status" :3,
            "professor_reply" : reply,
            "approved_time" : time,
            "approved_date" : date
        },
        { where: {id: req.param("id")}
        }).success(function(info){
            //send mail to student TODO
            console.log("Meet Approved ");
            res.redirect('/faculty/');
        });
};