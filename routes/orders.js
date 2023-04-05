var express = require('express');
var router = express.Router();
const {addOneOrder} = require('./../models/orders');

/* add one order */
router.post('/add/one', function(req, res) {
    addOneOrder(req.body).then((result)=>{
    return res.send(result.data);
  }).catch((e)=>{
    return res.status(400).send(e);
    });
});

module.exports = router;
