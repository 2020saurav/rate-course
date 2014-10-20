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
	   course_comment: {type: DataTypes.TEXT},
	   prof_comment: {type: DataTypes.TEXT},
	   spam_flag_count: {type: DataTypes.INTEGER, defaultValue: 0},
	   is_deleted: {type: DataTypes.BOOLEAN, defaultValue: false} 
	   // TODO complete this

        },
        {
            freezeTableName : true,
            underscored : true,
            tableName : 'review',
            timestamps : false
        });

    return Review;
}
