var model = require('../models/index');
var fs = require('fs');
var formidable = require('formidable');
var path = require('path');
var userModel = model.sequelize.models.user;

module.exports = function(req, res) {
    var userId = req.session.userId;
console.log(req.session);
    var form = new formidable.IncomingForm();
    form.parse(req,function(err,fields,files) {
        var pic = files.profilePic;
        var old_path = pic.path,
            file_size = pic.size,
            file_ext = pic.name.split('.').pop(),
        // TODO check for non-allowed extensions and file size
            file_name = req.session.user,
            new_path = path.join(process.env.PWD, '/public/images/', file_name + '.' + file_ext);
        console.log(new_path);
        fs.readFile(old_path, function (err, data) {
            fs.writeFile(new_path, data, function(err) {
                fs.unlink(old_path, function(err) {
                    if(err)
                        console.log(err);
                    else
                    {
                        var publicPath = "/images/" + file_name + '.' + file_ext;
                        userModel.update(
                            {photo_url : publicPath},
                            { where : {"id" : userId}}
                        ).success(function(user) {

                                res.redirect('/user/profile/update');
                        })


                    }
                })
            })
        })
    });
};