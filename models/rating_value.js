/**
 * rating_value
 *
 * id                   INTEGER
 * rating_id            INTEGER FK
 * rating_param_id      INTEGER FK
 * value                INTEGER
 * is_deleted           INTEGER(1)
 */

module.exports = function(sequelize, DataTypes) {
    var RatingValue =  sequelize.define ('rating_value',
        {
            id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true}
            // TODO complete this

        },
        {
            freezeTableName : true,
            underscored : true,
            tableName : 'rating_value',
            timestamps : false
        });

    return RatingValue;
}