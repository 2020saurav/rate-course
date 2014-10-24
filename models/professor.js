/**
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|Model}
 */
module.exports = function(sequelize, DataTypes) {
    var Professor =  sequelize.define ('professor',
        {
            id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
            first_name: {type: DataTypes.STRING(40), allowNull: false },
            last_name: {type: DataTypes.STRING(40), allowNull:true},
            designation: {type: DataTypes.STRING(40),allowNull:true},
            department: {type: DataTypes.STRING(40), allowNull:true},
            email: {type: DataTypes.STRING(40)},
            homepage_url: {type: DataTypes.STRING(255)},
            photo_url: {type: DataTypes.STRING(255)}
        },
        {
            freezeTableName : true,
            underscored : true,
            tableName : 'professor',
            timestamps : false
        });

    return Professor;
}
