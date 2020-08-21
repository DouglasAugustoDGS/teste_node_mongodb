var express = require('express');
var router = express.Router();
const bcrypt = require('bcrypt');

const cookieParser = require('cookie-parser');

router.use(cookieParser());

/* GET home page. */
router.get('/', function(req, res, next) {
  global.db.findAllCustomers((e, docs) => {
    if(e){
      return console.log(e);
    }
    const cookies = req.cookies;
    const user = cookies.userConnected;
    res.render('index', { docs, user } );
  })
});

/* POST new page. */
router.post('/new', function(req, res, next) {
  const nome = req.body.nome;
  const idade = parseInt(req.body.idade);
  const uf = req.body.uf;
  global.db.insertCustomer({nome, idade, uf}, (err, result) => {
    if(err){
      return console.log(err);
    }
    res.redirect('/');
  });
});

/* POST new-user page. */
router.post('/new-user', function(req, res, next) {
  const nome = req.body.nome;
  const email = req.body.email;
  const senha = req.body.senha;
  global.db.insertUser({nome, email, senha}, (err, result) => {
    if(err){
      return console.log(err);
    }
    res.redirect('/');
  });
});

/* GET delete page. */
router.get('/delete/:id', function(req, res) {
  var id = req.params.id;
  global.db.deleteOneCustomer(id, (e, result) => {
        if(e) { return console.log(e); }
        res.redirect('/');
      });
});

/* GET deleteuser page. */
router.get('/deleteuser/:id', function(req, res) {
  var id = req.params.id;
  global.db.deleteOneUser(id, (e, result) => {
        if(e) { return console.log(e); }
        res.redirect('/');
      });
});

/* POST login page. */
router.post('/login', function(req, res, next) {
  const email = req.body.email;
  const senha = req.body.senha;
  global.db.findOneUser({email, senha}, (err, result) => {
    if(err){
      console.log("Erro ao conectar: " + err);
    }
    if(result[0]){
      bcrypt.compare(senha, result[0].senha, function(erroBcrypt, rs) {
        if(rs){
          res.cookie('userConnected', email);
          res.redirect('/');
        }else if(erroBcrypt || rs==false){
          res.redirect("/login?invalid");
        }
      });
    }else{
      res.redirect("/login?invalid");
    }
  });
});

/* POST logout page. */
router.get('/logout', function(req, res, next) {
  res.clearCookie('userConnected');
  res.redirect('/');
});

module.exports = router;
