var URL = require('url');
var model = require('../models/index');
var professorModel = model.sequelize.models.professor;
var courseModel = model.sequelize.models.course;
var Sequelize = require('sequelize');
var helper = require('./helper');

module.exports = function (req, res) {
    var urlParse = URL.parse(req.url, true);
    var query = urlParse.query.q;
    var title, description, url, response;
    var responses = [];
    var tag = helper.getParentFromTag(query);
    courseModel.findAll({
        where : Sequelize.or(
            {"department": query},
            ["course_name LIKE '%"+query+"%'"],
            ["course_number LIKE '%"+query+"%'"],
            {"department": tag},
            ["course_name LIKE '%"+tag+"%'"],
            ["course_number LIKE '%"+tag+"%'"]
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