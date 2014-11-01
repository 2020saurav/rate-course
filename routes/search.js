/* TODO
For help see github.com/2020saurav/search-nmjs
1. get the search query from url param /search/?q=query
2. classify into possible categories.
3. search in database, rank the results if possible based on categories
4. send result
 */
var URL = require('url');
var model = require('../models/index');
var professorModel = model.sequelize.models.professor;
var courseModel = model.sequelize.models.course;

module.exports = function (req, res) {
    var urlParse = URL.parse(req.url, true);
    var query = urlParse.query.q;
    var responses = [
        {
            "title" : "Title1",
            "description" : "Desc 1",
            "url" : "/course/1/"
        },
        {
            "title" : "Title2",
            "description" : "Desc 2",
            "url" : "/course/2/"
        }
    ];
    // write sequelize here : put things in responses as shown above TODO
    // send sorted results from here if need be
    res.render('searchResult',{"query":query, "responses": responses, "session" : req.session});


};