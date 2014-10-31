/*
    1. do not change password.
    2. set new auth token (not null)
    3. send mail
 */
module.exports = function (req, res) {
    res.send(req.body);
};