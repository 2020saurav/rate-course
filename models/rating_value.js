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
            id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
	    rating_id: {type: DataTypes.INTEGER, allowNull: false},
	    rating_param_id: {type: DataTypes.INTEGER, allowNull: false},
	    value: { type: DataTypes.INTEGER, allowNull: false},
	    is_deleted: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
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
