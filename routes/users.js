var express = require('express');
var router = express.Router();
const {getAllUser} = require('./../models/User');


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



module.exports = router;
