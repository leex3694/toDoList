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

router.get('/getCategories', function(req, res, next){
    ToDo.find(function(err, toDo){
        console.log("getting is working");
        res.json(toDo);
    })
});


router.put("/postTheme/:category/", function(request, response, next){
    var varCategory = request.params.category ;
    console.log('passed category', varCategory);
    console.log(request.params);
    ToDo.findOne({category: varCategory}, function(err, toDo){
        if (err) throw err;
        console.log(toDo);
        toDo.themes = request.body.themes;



        //toDo.done = true;
        //
        toDo.save(function(err){
            if (err)
            response.send(err);
            response.send(200);
        })
    });
//console.log(request.body)

});

router.put("/completeTheme/:category/:theme?", function(request, response, next){
    var varCategory = request.params.category ;
    console.log('passed category', varCategory);
    console.log(request.params);
    ToDo.findOne({category: varCategory}, function(err, toDo){
        if (err) throw err;
        console.log(toDo);
        //toDo.themes = request.body.themes;

        for(var it = 0; it < toDo.themes.length; it++){
            console.log(toDo.themes[it].name, request.params.theme);
            if(toDo.themes[it].name == request.params.theme){
                toDo.themes[it].done = true;
                console.log("FOUND A MATCH");
            }

        }

        toDo.markModified('themes');

        toDo.save(function(err){
            if (err)
            response.send(err);
            response.send(200);
        })
    });
//console.log(request.body)

});


router.delete("/deleteTheme/:themes?", function (req, res, next){
    toDo.themes.remove({})
});

module.exports = router;
