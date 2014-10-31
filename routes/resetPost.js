/* TODO
1. match auth key with username/id in user table. null auth key not allowed
2. set new password
3. remove auth key
4. set session or redirect to login page
 */
module.exports = function (req, res) {
    res.send(req.body);
};