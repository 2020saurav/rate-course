var Sequelize = require('sequelize');
module.exports = {
    db : {
        host : 'localhost',
        database : 'rate-course',
        username : 'root',
        password : 'root'
    },
    server : {
        ip : '172.24.128.203',
        port : '3000'

    },
    gmail : {
        user: 'rate.course.iitk@gmail.com',
        pass: 'rate.course.iitk2014'
    },
    recommender : {
        updateLink : "http://localhost/xman/post.php",
        getLink : "http://localhost/xman/recommend.php"
    },
    modelConnect : store = new Sequelize('rate-course', 'root','root')
};