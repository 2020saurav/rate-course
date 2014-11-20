var model = require('../models/index');
var meetProfessorModel = model.sequelize.models.meet_professor;
var helper = require('./helper');
var userModel = model.sequelize.models.user;
userModel.hasMany(meetProfessorModel,{foreignKey:"user_id"});
meetProfessorModel.belongsTo(userModel,{foreignKey:"user_id"});
var professorModel = model.sequelize.models.professor;
professorModel.hasMany(meetProfessorModel,{foreignKey:"professor_id"});
meetProfessorModel.belongsTo(professorModel,{foreignKey:"professor_id"});
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

            meetProfessorModel.findOne({
             where: {id: req.param("id")},
             include: [
                 {model : userModel},
                 {model : professorModel}
             ]
            }).success(function(meet) {
                helper.meetApprovedUserEmail(meet.user.email,meet.user.first_name,meet.professor.first_name+" "+meet.professor.last_name,meet.approved_date,meet.approved_time,meet.professor_reply);
                console.log("Meet Approved ");
                res.redirect('/faculty/');
            });
        });
};