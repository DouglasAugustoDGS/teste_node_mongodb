var express = require('express');
var router = express.Router();

const cookieParser = require('cookie-parser');
router.use(cookieParser());

/* GET home page. */
router.get('/', function(req, res, next) {
    const cookies = req.cookies;
    const user = cookies.userConnected;
    res.render('new', {user});
});

module.exports = router;
