/**
 * id               INTEGER
 * user_id          INTEGER
 * type             INTEGER
 * item_id          INTEGER
 * create_time      INTEGER
 * is_resolved      INTEGER(1)
 */

module.exports = function(sequelize, DataTypes) {
    var Spam =  sequelize.define ('spam',
        {
            id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
            user_id: {type: DataTypes.INTEGER, allowNull: false},
	        type: {type: DataTypes.INTEGER, allowNull: false},
            item_id: {type: DataTypes.INTEGER, allowNull:false},
            create_time: {type: DataTypes.INTEGER, allowNull: false},
	        is_resolved: {type: DataTypes.BOOLEAN, allowNull:false, defaultValue: true}
        },
        {
            freezeTableName : true,
            underscored : true,
            tableName : 'spam',
            timestamps : false
        });

    return Spam;
}
