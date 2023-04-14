var express = require('express');
var router = express.Router();
const {getAllProducts,getLatestProducts,getOneProduct,addOneProduct,
  updateOneProduct,getProductsFromMerchant,deleteOneProduct} = require('./../models/product');

/*
get all products
*/
router.post('/all', function(req, res) {
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

/* add one product */
router.post('/add/one', function(req, res) {
  addOneProduct(req.body).then((result)=>{
  return res.send(result.data);
}).catch((e)=>{
  return res.status(400).send(e);
  });
});

/* get products own by merchant */
router.post('/get/own_by_merchant', function(req, res) {
  getProductsFromMerchant(req.body).then((result)=>{
  return res.send(result.data);
}).catch((e)=>{
  return res.status(400).send(e);
  });
});

/* update one product */
router.post('/update/one', function(req, res) {
  updateOneProduct(req.body).then((result)=>{
  return res.send(result.data);
}).catch((e)=>{
  return res.status(400).send(e);
  });
});



/* delete one product */
router.post('/delete/one', function(req, res) {
  deleteOneProduct(req.body).then((result)=>{
  return res.send(result.data);
}).catch((e)=>{
  return res.status(400).send(e);
  });
});

module.exports = router;
