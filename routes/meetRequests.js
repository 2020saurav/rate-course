var model = require('../models/index');
var meetProfessorModel = model.sequelize.models.meet_professor;

var professorModel = model.sequelize.models.professor;
professorModel.hasMany(meetProfessorModel,{foreignKey:"professor_id"});
meetProfessorModel.belongsTo(professorModel,{foreignKey:"professor_id"});

module.exports = function(req, res) {
    var userId = req.session.userId;
    meetProfessorModel.findAll({
        where: { "user_id" : userId},
        order:'id DESC',
        include : [
            {model : professorModel}
        ]
    }).success(function(meets) {
        res.render('meetRequests',{"session" : req.session, "meets": meets});
    });

};