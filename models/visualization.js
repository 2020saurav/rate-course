/**
 *
 * @param sequelize
 * @param DataTypes
 * @returns {*|Model}
 */
module.exports = function(sequelize, DataTypes) {
    var Visualization =  sequelize.define ('visualization',
        {
            id: {type: DataTypes.INTEGER, allowNull: false, autoIncrement: true, primaryKey: true},
            course_offering_id: {type: DataTypes.INTEGER(10), allowNull:false},
            q1_count1: {type: DataTypes.INTEGER(20), defaultValue: 0},
            q1_count2: {type: DataTypes.INTEGER(20), defaultValue: 0},
            q1_count3: {type: DataTypes.INTEGER(20), defaultValue: 0},
            q1_count4: {type: DataTypes.INTEGER(20), defaultValue: 0},
            q1_count5: {type: DataTypes.INTEGER(20), defaultValue: 0},
            q2_count1: {type: DataTypes.INTEGER(20), defaultValue: 0},
            q2_count2: {type: DataTypes.INTEGER(20), defaultValue: 0},
            q2_count3: {type: DataTypes.INTEGER(20), defaultValue: 0},
            q2_count4: {type: DataTypes.INTEGER(20), defaultValue: 0},
            q2_count5: {type: DataTypes.INTEGER(20), defaultValue: 0}
        },
        {
            freezeTableName : true,
            underscored : true,
            tableName : 'visualization',
            timestamps : false
        });

    return Visualization;
}