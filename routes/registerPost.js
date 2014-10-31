var JSFtp = require('jsftp');
var helper = require('./helper');

module.exports = function (req, res) {
    var cclogin = req.body.login;
    var ccpassword = req.body.password;

    var Ftp = new JSFtp({
        host: "webhome.cc.iitk.ac.in",
        port: 21
    });
    Ftp.auth(cclogin,ccpassword,function(err) {
        if(err)
        {
            res.send("False"); // wrong CC password or login : TODO error message
        }
        else
        {
            // valid IITK user TODO
            // insert in db if not already there! if success, send email and success message! else say already registered.. use fpwd
            helper.regEmail(cclogin);
            console.log("email sent regPost!");
        }

    })

};