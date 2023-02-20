var express = require('express');
var router = express.Router();
const {getAllProducts} = require('./../models/product');



/*
Test url to check whether can backend send data to frontend
*/
router.get('/all', function(req, res) {
    getAllProducts(req.body).then((result)=>{
    return res.send(result)
  }).catch((e)=>{
    return res.status(400).send(e);
  });
});



module.exports = router;
