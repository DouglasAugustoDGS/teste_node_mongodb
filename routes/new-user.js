var express = require('express');
var router = express.Router();

const cookieParser = require('cookie-parser');
router.use(cookieParser());

/* GET home page. */
router.get('/', function(req, res, next) {
  const cookies = req.cookies;
    const user = cookies.userConnected;
    if(!user){ 
      res.render('new-user', {user});
    }else{
      res.redirect('/');
    }
});

module.exports = router;