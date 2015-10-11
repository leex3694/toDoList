var express = require('express');
var router = express.Router();
var path = require('path');
var ToDo = require('../models/ToDoSchema');
var bodyParser = require('body-parser');



/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('index route hit');
  res.sendFile(path.join(__dirname, "../views/index.html"))
});

router.post('/getCategory', function(request, res, next){
  var toDo = new ToDo(request.body);
    //toDo.create(req.body, function(err, post) {
    //    res.send('ok');
    //});
  toDo.save(function(err){
      if(err) throw err;
      console.log('Error:', err);
      console.log(toDo);
      res.send(toDo);
  })
});

//sagit rae

module.exports = router;
