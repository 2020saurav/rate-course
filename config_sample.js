var Sequelize = require('sequelize');
module.exports = {
    db : {
        host : 'localhost',
        database : 'rate-course',
        username : 'root',
        password : 'root'
    },
    server : {
        ip : 'http://172.24.128.203:3000'

    },
    modelConnect : store = new Sequelize('rate-course', 'root','root')
}