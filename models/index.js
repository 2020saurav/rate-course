var Sequelize = require('sequelize');
var config    = require('../config').db;  // we use node-config to handle environments

// initialize database connection

var sequelize = new Sequelize(config.database, config.username, config.password, {
        logging: false,
        maxConcurrentQueries: 100
    });

// load models
var models = [
    'course',
    'course_offering',
    'course_offering_rating_param',
    'cumulative_rating_value',
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
//sequelize.sync({force:true})
// force true will drop table.
//console.log("model/index called")

module.exports.sequelize = sequelize;
