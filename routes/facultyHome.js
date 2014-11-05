var model = require('../models/index');
var meetProfessorModel = model.sequelize.models.meet_professor;

var userModel = model.sequelize.models.user;
userModel.hasMany(meetProfessorModel,{foreignKey:"user_id"});
meetProfessorModel.belongsTo(userModel,{foreignKey:"user_id"});
module.exports = function(req, res) {
    var professorId = req.session.userId;
    meetProfessorModel.findAll({
        where: { "professor_id" : professorId},
        order:'id DESC',
        include : [
            {model : userModel}
        ]
    }).success(function(meets) {
        res.render('faculty/home',{"session" : req.session, "meets": meets});
    });

};