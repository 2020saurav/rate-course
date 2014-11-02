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
var Sequelize = require('sequelize');

module.exports = function (req, res) {
    var urlParse = URL.parse(req.url, true);
    var query = urlParse.query.q;
    var title, description, url, response;
    var responses = [];
    courseModel.findAll({
        where : Sequelize.or(
            {"department": query},
            ["course_name LIKE '%"+query+"%'"],
            ["course_number LIKE '%"+query+"%'"]
        )
    }).success(function(courses){
        for(var i=0; i<courses.length; i++)
        {
            title = courses[i].course_number+" "+courses[i].course_name;
            description = courses[i].description;
            url = '/course/'+courses[i].id+'/';

            response = {"title" : title, "description": description, "url" : url};
            responses.push(response);
        }
        professorModel.findAll({
            where : Sequelize.or(
                ["first_name LIKE '%"+query+"%'"],
                ["last_name LIKE '%"+query+"%'"],
                ["email LIKE '%"+query+"%'"]
            )
        }).success(function(professors) {
            for(var i=0; i<professors.length; i++)
            {
                title = professors[i].first_name+" "+ professors[i].last_name;
                description = "Department: "+ professors[i].department;
                url = '/professor/'+professors[i].id+'/';

                response = {"title" : title, "description": description, "url" : url};
                responses.push(response);
            }
            res.render('searchResult',{"query":query, "responses": responses, "session" : req.session});
        });
    });
};