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
            id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true}
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