var express = require('express');
var router = express.Router();
const {addOneTransaction,getOneTranscationFromOneOrder,getTranscationFromSameOrder} = require('./../models/transaction');

/* add one transaction */
router.post('/add/one', function(req, res) {
    addOneTransaction(req.body).then((result)=>{
    return res.send(result.data);
  }).catch((e)=>{
    return res.status(400).send(e);
    });
});

/* Get one transcation from one order based on uuid
 */
router.post('/get/one/fromOneOrder', function(req, res) {
  getOneTranscationFromOneOrder(req.body).then((result)=>{
  return res.send(result.data);
}).catch((e)=>{
  return res.status(400).send(e);
  });
});

/* Get same transcation from same order based on uuid
 */
router.post('/get/one/fromSameOrder', function(req, res) {
  getTranscationFromSameOrder(req.body).then((result)=>{
  return res.send(result.data);
}).catch((e)=>{
  return res.status(400).send(e);
  });
});

module.exports = router;