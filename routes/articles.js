var express = require('express');
var router = express.Router();


/* GET articles listing */
router.get('/articles', function(req, res){

	var db = req.db;
	db.collection('articles').find().sort({date:1}).toArray(function(err, items){
		res.json(items);
	});
});

/* GET new article view */
router.get('/new', function(req, res){
	res.render('new', {title: "My Awesome blog !"});
});

/* POST new article to mongo */
router.post("/new", function(req, res){

	var db = req.db;

	req.body.date =  now();


	db.collection('articles').insert(req.body, function(err, result){
		res.send(
			(err === null)?{msg:''}:{msg:err}
		);
	});
});

var now = function(){
	var dateNow = new Date();
	var month = dateNow.getMonth()+1;
	month = month<10?"0"+month:month;

	var day = dateNow.getDate();
	day = day<10?"0"+day:day;

	var year = dateNow.getFullYear();

	var hour = dateNow.getHours();
	hour = hour<10?"0"+hour:hour;

	var minutes = dateNow.getMinutes();
	minutes = minutes<10?"0"+minutes:minutes;

	var seconds = dateNow.getSeconds();
	seconds = seconds<10?"0"+seconds:seconds;

	return month + "/" + day + "/" + year + " " + hour + ":" + minutes + ":" + seconds;
};

module.exports = router;
