var Sequelize = require('sequelize');
var config    = require('../config').db;  // we use node-config to handle environments

// initialize database connection
var sequelize = new Sequelize(
    config.database,
    config.username,
    config.password
);

// load models
var models = [
    'course'
];

models.forEach(function(model) {
    module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// will define relationships here, later TODO
// create tables in db if not exist:
sequelize.sync()
// force true will drop table.
module.exports.sequelize = sequelize;
