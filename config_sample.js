var Sequelize = require('sequelize');
module.exports = {
    db : {
        host : 'localhost',
        database : 'rate-course',
        username : 'root',
        password : 'root'
    },
    server : {

    },
    modelConnect : store = new Sequelize('rate-course', 'root','root')
}