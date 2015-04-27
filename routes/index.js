var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/:var(index)?', function(req, res, next) {
  res.render('index', { title: 'My Awesome blog !' });
});


/* GET blog article */
router.get('/:id', function(res, res, next) {
  res.render('article', {title : 'My Awesome blog !'});
})


module.exports = router;
