/**
 * 
 * @param sequelize
 * @param DataTypes
 * @returns {*|Model}
 */
module.exports = function(sequelize, DataTypes) {
    var Review =  sequelize.define ('review',
        {
            id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
            rating_id: {type: DataTypes.INTEGER, allowNull: false},
	        course_comment: {type: DataTypes.TEXT, allowNull:true},
	        prof_comment: {type: DataTypes.TEXT, allowNull:true},
	        spam_flag_count: {type: DataTypes.INTEGER, allowNull:false, defaultValue: 0},
	        is_deleted: {type: DataTypes.BOOLEAN, allowNull:false, defaultValue: false}
        },
        {
            freezeTableName : true,
            underscored : true,
            tableName : 'review',
            timestamps : false
        });

    return Review;
}
