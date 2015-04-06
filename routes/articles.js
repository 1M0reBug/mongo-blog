var express = require('express');
var router = express.Router();

/* GET articles listing */
router.get('/articles', function(req, res){

	var db = req.db;
	db.collection('articles').find().toArray(function(err, items){
		res.json(items);
	});
});

module.exports = router;
