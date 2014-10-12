/*
Model for Course Table
* id			INTEGER
* course_number	VARCHAR(11)
* course_name	VARCHAR(100)
* description	VARCHAR(1024)
* department	VARCHAR(11)
*/

var Sequelize = require("sequelize");

module.exports = function(sequelize, DataTypes) {
    return sequelize.define ('Course',
    {
		id : {type : Sequelize.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
    	course_number : { type: Sequelize.STRING, allowNull:false}
    },
    {
    	freezeTableName : true,
    	underscored : true,
    	tableName : 'course',
    	timestamps : false
    });
}


