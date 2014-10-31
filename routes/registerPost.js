/*
1. CC verification
2. Insert login as name, login, email@iitk in db
3. Set random auth token, set password to be some random string, isactive false
4. send mail
 */
var JSFtp = require('jsftp');

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
            res.send("False"); // wrong CC password or login
        }
        else
        {
            res.send("True"); // right login!
        }

    })

};