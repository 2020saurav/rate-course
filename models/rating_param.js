/**
 * 
 * @param sequelize
 * @param DataTypes
 * @returns {*|Model}
 */
module.exports = function(sequelize, DataTypes) {
    var RatingParam =  sequelize.define ('rating_param',
        {
            id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
            name: {type: DataTypes.TEXT, allowNull: false},
	        type: {type: DataTypes.INTEGER, allowNull: false},
	        sort_order: {type: DataTypes.INTEGER, allowNull: true}

        },
        {
            freezeTableName : true,
            underscored : true,
            tableName : 'rating_param',
            timestamps : false
        });

    return RatingParam;
}
