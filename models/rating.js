/**
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|Model}
 */
module.exports = function(sequelize, DataTypes) {
    var Rating =  sequelize.define ('rating',
        {
            id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
            user_id: {type: DataTypes.INTEGER, allowNull:false},
            as_anon: {type: DataTypes.BOOLEAN, allowNull:false, defaultValue: false},
            course_offering_id: {type: DataTypes.INTEGER, allowNull:false},
            create_time: {type: DataTypes.INTEGER, allowNull:false},
            is_deleted: {type: DataTypes.BOOLEAN, allowNull:false, defaultValue:false}
        },
        {
            freezeTableName : true,
            underscored : true,
            tableName : 'rating',
            timestamps : false
        });

    return Rating;
}

