var express = require('express');
var router = express.Router();
const {getAllUser,getOneUser,registerOneUser} = require('./../models/User');


router.get('/', function(req, res) {
  res.send('respond with a resource');
});

/*
Test url to check whether can backend send data to frontend
*/
router.get('/test', function(req, res) {
  getAllUser(req.body).then((result)=>{
    return res.send(result)
  }).catch((e)=>{
    return res.status(400).send(e);
  });
});

/* get one user info */
router.post('/info/one', function(req, res) {
  getOneUser(req.body).then((result)=>{
    return res.send(result.data);
}).catch((e)=>{
    return res.status(400).send(e);
  });
});

/* register user one */
router.post('/register/one', function(req, res) {
  registerOneUser(req.body).then((result)=>{
    return res.send(result);
}).catch((e)=>{
    return res.status(400).send(e);
  });
});


module.exports = router;
