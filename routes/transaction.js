var express = require('express');
var router = express.Router();
const {addOneTransaction} = require('./../models/transaction');

/* add one transaction */
router.post('/add/one', function(req, res) {
    addOneTransaction(req.body).then((result)=>{
    return res.send(result.data);
  }).catch((e)=>{
    return res.status(400).send(e);
    });
});

module.exports = router;
