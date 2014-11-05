var model = require('../models/index');
var meetProfessorModel = model.sequelize.models.meet_professor;

module.exports = function(req, res) {

    var userId = req.session.userId;
    var professorId = req.param("id");
    var message = req.body.message;
    meetProfessorModel.create({
        "user_id" : userId,
        "professor_id" : professorId,
        "user_message" : message,
        "status" : 1
    }).success(function(meet) {
        console.log("Meet created");
        res.redirect('/user/meet/requests/')
    })
};