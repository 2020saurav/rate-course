/**
 * 
 * @param sequelize
 * @param DataTypes
 * @returns {*|Model}
 */
module.exports = function(sequelize, DataTypes) {
    var User =  sequelize.define ('user',
        {
            id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
            login: {type: DataTypes.STRING(40), unique: true, allowNull: false},
	        password: {type: DataTypes.STRING(255), allowNull: false},
            email: {type: DataTypes.STRING(40), allowNull:false},
	        first_name: {type: DataTypes.STRING(50), allowNull: false},
	        last_name: {type: DataTypes.STRING(50)},
	        last_login: {type: DataTypes.INTEGER, allowNull:false, defaultValue:0},
	        last_ip: {type: DataTypes.STRING(25), allowNull:false, defaultValue:'0'},
	        is_active: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true},
	        photo_url: {type: DataTypes.STRING(255), allowNull:true},
	        password_token: {type: DataTypes.STRING(255)}
        },
        {
            freezeTableName : true,
            underscored : true,
            tableName : 'user',
            timestamps : false
        });

    return User;
}
