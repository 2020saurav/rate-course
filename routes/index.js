exports.index = function(req, res) {
	res.render('index');
}

exports.course = function(req, res) {
    res.render('course');
}

exports.courseOffering = function(req, res) {
    res.render('courseOffering',{
        "courseId" : req.param("id"),
        "instructor" : "Shubhv"

    });
}
