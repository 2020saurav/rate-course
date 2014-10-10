exports.index = function(req, res) {
	//res.render('index');
	req.getConnection(function(err,connection) {
		connection.query('SELECT * FROM names',function(err,rows) {
			
			if(err)
				console.log("Error : %s",err);
			res.render('index',{data:rows});
		});
	});
}