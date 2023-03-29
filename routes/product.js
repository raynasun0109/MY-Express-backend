var express = require('express');
var router = express.Router();
const {getAllProducts,getLatestProducts,getOneProduct} = require('./../models/product');



/*
get all products
*/
router.get('/all', function(req, res) {
    getAllProducts(req.body).then((result)=>{
    return res.send(result)
  }).catch((e)=>{
    return res.status(400).send(e);
  });
});

/* get latest products */
router.post('/latest', function(req, res) {
  getLatestProducts(req.body).then((result)=>{
  return res.send(result.data);
}).catch((e)=>{
  return res.status(400).send(e);
  });
});

/* get one product */
router.post('/get/one', function(req, res) {
  getOneProduct(req.body).then((result)=>{
  return res.send(result.data);
}).catch((e)=>{
  return res.status(400).send(e);
  });
});

module.exports = router;
