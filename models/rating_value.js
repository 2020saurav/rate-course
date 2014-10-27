/**
 * 
 * @param sequelize
 * @param DataTypes
 * @returns {*|Model}
 */
module.exports = function(sequelize, DataTypes) {
    var RatingValue =  sequelize.define ('rating_value',
        {
            id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
	        rating_id: {type: DataTypes.INTEGER, allowNull: false},
	        rating_param_id: {type: DataTypes.INTEGER, allowNull: false},
	        value: {type: DataTypes.INTEGER, allowNull: false},
	        is_deleted: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false}
        },
        {
            freezeTableName : true,
            underscored : true,
            tableName : 'rating_value',
            timestamps : false
        });

    return RatingValue;
}
