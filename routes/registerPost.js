/*
1. CC verification
2. Insert login as name, login, email@iitk in db
3. Set random auth token, set password to be some random string, isactive false
4. send mail
 */
module.exports = function (req, res) {
    res.send(req.body);
}