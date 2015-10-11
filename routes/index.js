var express = require('express');
var router = express.Router();
var path = require('path');
var ToDo = require('../models/ToDoSchema');
var TaskPost = require('../models/TaskPostSchema');
var bodyParser = require('body-parser');



/* GET home page. */
router.get('/', function(req, res, next) {
  console.log('index route hit');
  res.sendFile(path.join(__dirname, "../views/index.html"))
});

router.post('/postCategory', function(request, res, next){
  var toDo = new ToDo(request.body);
  toDo.save(function(err){
      if(err) throw err;
      console.log('Error:', err);
      res.send(toDo);
  })
});


router.post("/postTheme", function(request, response, next{
    var taskPost = new TaskPost(request.body);
    taskPost.save(function(err){
        if(err) throw err;
        response.send(taskPost);
    })
}));


module.exports = router;
