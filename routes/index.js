var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'IDE'});
});

router.get('/:file(*)', function(req, res, next){
    var file = req.params.file
        , path =  './files/' + file;

    console.log('downloading: ' + path);

    res.download(path);
});

module.exports = router;
