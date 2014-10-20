/**
 * review
 *
 * id                   INTEGER
 * rating_id            INTEGER FK
 * course_comment       TEXT
 * prof_comment         TEXT
 * spam_flag_count      INTEGER
 * is_deleted           INTEGER(1)
 *
 * */

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
