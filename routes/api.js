var express = require('express');
var router = express.Router();



var token_controller = require('../controllers/api/tokenController');



//TOKEN
router.get('/tokenAuth0', token_controller.refreshAuth0Token);



module.exports = router