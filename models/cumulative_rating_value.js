/**
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|Model}
 */
module.exports = function(sequelize, DataTypes) {
    var CumulativeRatingValue =  sequelize.define ('cumulative_rating_value',
        {
            id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
            course_offering_id: {type: DataTypes.INTEGER, allowNull: false },
            rating_param_id: {type: DataTypes.INTEGER, allowNull: false},
            value: {type: DataTypes. FLOAT, allowNull:true}
        },
        {
            freezeTableName : true,
            underscored : true,
            tableName : 'cumulative_rating_value',
            timestamps : false
        });

    return CumulativeRatingValue;
}