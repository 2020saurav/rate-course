/**
 * rating_param
 *
 * id           INTEGER
 * name         TEXT
 * type         INTEGER
 * sort_order   INTEGER
 */

module.exports = function(sequelize, DataTypes) {
    var RatingParam =  sequelize.define ('rating_param',
        {
            id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true}
            // TODO complete this

        },
        {
            freezeTableName : true,
            underscored : true,
            tableName : 'rating_param',
            timestamps : false
        });

    return RatingParam;
}