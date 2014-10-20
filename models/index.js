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
    'course',
    'course_offering',
    'course_offering_rating_param',
    'discussion',
    'professor',
    'rating',
    'rating_param',
    'rating_value',
    'review',
    'spam',
    'user'
    ];

models.forEach(function(model) {
    module.exports[model] = sequelize.import(__dirname + '/' + model);
});

// create tables in db if not exist:
//sequelize.sync()
// force true will drop table.
module.exports.sequelize = sequelize;
