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
            id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true}
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