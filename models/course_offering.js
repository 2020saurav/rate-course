/**
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|Model}
 */
module.exports = function(sequelize, DataTypes) {
    var CourseOffering =  sequelize.define ('course_offering',
        {
            id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
            course_id: {type: DataTypes.INTEGER, allowNull:false},
            year: {type: DataTypes.INTEGER, allowNull: false},
            semester: {type: DataTypes.INTEGER, allowNull:false},
            professor_id: {type: DataTypes.INTEGER, allowNull:true},
            overall_rating: {type:DataTypes.FLOAT, allowNull:true},
            number_of_students: {type: DataTypes.INTEGER, allowNull:true},
            website: {type: DataTypes.TEXT, allowNull:true}
        },
        {
            freezeTableName : true,
            underscored : true,
            tableName : 'course_offering',
            timestamps : false
        });

    return CourseOffering;
}
