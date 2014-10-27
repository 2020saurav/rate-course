/**
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|Model}
 */
module.exports = function(sequelize, DataTypes) {
    var CourseOfferingRatingParam =  sequelize.define ('course_offering_rating_param',
        {
            id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
            course_offering_id: {type: DataTypes.INTEGER, allowNull: false},
            rating_param_id: {type: DataTypes.INTEGER, allowNull: false},
            weight: {type: DataTypes.FLOAT, allowNull: false},
            max_value: {type: DataTypes.INTEGER, allowNull: false}
        },
        {
            freezeTableName : true,
            underscored : true,
            tableName : 'course_offering_rating_param',
            timestamps : false
        });

    return CourseOfferingRatingParam;
}