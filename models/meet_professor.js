/**
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|Model}
 * status :
 * 1 - PENDING
 * 2 - REJECTED
 * 3 - APPROVED
 */
module.exports = function(sequelize, DataTypes) {
    var MeetProfessor =  sequelize.define ('meet_professor',
        {
            id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
            user_id: {type: DataTypes.INTEGER, allowNull:false},
            professor_id : {type: DataTypes.INTEGER, allowNull:false},
            user_message:{type: DataTypes.STRING, allowNull:true},
            status: {type: DataTypes.INTEGER, allowNull:false},
            professor_reply:{type: DataTypes.STRING, allowNull:true},
            approved_time: {type: DataTypes.INTEGER, allowNull:true}
        },
        {
            freezeTableName : true,
            underscored : true,
            tableName : 'meet_professor',
            timestamps : false,
            charset: 'utf8',
            collate: 'utf8_general_ci'
        });

    return MeetProfessor;
}
