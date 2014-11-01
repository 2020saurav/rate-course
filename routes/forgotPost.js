/*
TODO
1. check for valid username and email id.
2. if not already present, generate random string for token and save there
3. send email with this token
4. redirect to some page with success message
 */
module.exports = function (req, res) {
    //res.send(req.body);
    res.render('message',{"message":"Hello There","session":req.session})
};