/**
 * user
 *
 * id               INTEGER
 * login            VARCHAR(40)
 * password         VARCHAR(40)
 * email            VARCHAR(40)
 * first_name       VARCHAR(50)
 * last_name        VARCHAR(50)
 * last_login       INTEGER
 * last_ip          VARCHAR(25)
 * is_active        INTEGER(1)
 * photo_url        VARCHAR(255)
 * password_token   VARCHAR(255)
 *
 */
module.exports = function(sequelize, DataTypes) {
    var User =  sequelize.define ('user',
        {
            id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
           login: {type: DataTypes.STRING(40), allowNull: false},}
	   password: {type: DataTypes.STRING(40), allowNull: false},
           email: {type: DataTypes.STRING(40)},
	   first_name: {type: DataTypes.STRING(50), allowNull: false},
	   last_name: {type: DataTypes.STRING(50)},
	   last_login: {type: DataTypes.INTEGER},
	   last_ip: {type: DataTypes.STRING(25)},
	   is_active: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
	   photo_url: {type: DataTypes.STRING},
	   password_token: {type: DataTypes.STRING}
	    // TODO complete this

        },
        {
            freezeTableName : true,
            underscored : true,
            tableName : 'user',
            timestamps : false
        });

    return User;
}
