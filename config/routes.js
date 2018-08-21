var express = require('express');
var router = express.Router();
var itemCtr = require('../app/controllers/itemCtr')

router.get('/search',itemCtr.searchItemByUpc)
router.post('/save',itemCtr.saveItem)
router.get('/allitems',itemCtr.getAllItems)

module.exports = router;
