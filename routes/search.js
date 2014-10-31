/*
For help see github.com/2020saurav/search-nmjs
1. get the search query from url param /search/?q=query
2. classify into possible categories.
3. search in database, rank the results if possible based on categories
4. send result
 */
module.exports = function (req, res) {
    res.send(req.body);
};