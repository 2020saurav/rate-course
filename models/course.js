/**
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|Model}
 */
module.exports = function(sequelize, DataTypes) {
    var Course =  sequelize.define ('course',
    {
		id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    	course_number: {type: DataTypes.STRING(10), allowNull:false},
        course_name: {type: DataTypes.STRING(255), allowNull: false},
        description: {type: DataTypes.TEXT, allowNull:true},
        department: {type: DataTypes.STRING(255), allowNull:true},
        overall_rating: {type: DataTypes.FLOAT, allowNull:true}
    },
    {
    	freezeTableName : true,
    	underscored : true,
    	tableName : 'course',
    	timestamps : false
    });

    return Course;
}