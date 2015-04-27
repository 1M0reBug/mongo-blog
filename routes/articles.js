var express = require('express');
var router = express.Router();


/* GET articles listing */
router.get('/articles', function(req, res){

	var db = req.db;

	var limit = 10;
	var count = getCount(db);

	var numberOfPage = Math.ceil(count/limit);

	//On laisse la possibilité de la pagination
	var page = req.query.page;
	page = page > numberOfPage?numberOfPage:page;
	page = (page<=1 || page > numberOfPage) ?1:page;

	var queryString = "{";
	if ( req.query.title !== null){

	}

	db.collection('articles').find().skip(page > 0?((page-1)*10):0).limit(limit).sort({date:-1}).toArray(function(err, items){
		res.json(items);
	});
});

/* GET Total number of articles */
router.get('/count', function(req,res){
	var db = req.db;
	db.collection('articles').count(function (err, items) {
		res.json(items);
	})

});

/* GET new article view */
router.get('/new', function(req, res){
	res.render('new', {title: "My Awesome blog !"});
});


router.param('id', function(req, res, next, id) {
	var regex = /[a-zA-Z0-9]{24}/;
	var captures;
	if(captures = regex.exec(id)) {
		req.params.id = id;
		next();
	} else {
		next('/');
	}
});

router.get('/:id', function (req, res) {
	var db = req.db;

	var ObjectId = require('mongodb').ObjectID;

	var id = req.params.id;

	db.collection('articles').find({'_id' : new ObjectId(id)}).toArray(function (err, items) {
		res.json(items);
	});
});

/* POST new article to mongo */
router.post("/new", function(req, res){

	var db = req.db;

	req.body.date =  now();

	req.body.titleId = req.body.title.toLowerCase().replace(/\s+/g, '-');


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
}

var getCount = function (db) {
	db.collection('articles').count(function (err, items) {
		return items;
	});
};

module.exports = router;
