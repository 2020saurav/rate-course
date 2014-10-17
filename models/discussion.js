/**
 * discussion
 *
 * id               INTEGER
 * user_id          INTEGER FK
 * as_anon          INTEGER(1)
 * course_id        INTEGER
 * comment          TEXT
 * create_time      INTEGER
 * spam_flag_count  INTEGER DEFAULT 0
 * is_deleted       INTEGER(1) DEFAULT 0
 *
 */

module.exports = function(sequelize, DataTypes) {
    var Discussion =  sequelize.define ('discussion',
        {
            id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true}
            // TODO complete this

        },
        {
            freezeTableName : true,
            underscored : true,
            tableName : 'discussion',
            timestamps : false
        });

    return Discussion;
}
