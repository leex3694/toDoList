/**
 * Created by usuario on 10/11/15.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var taskPostSchema = new Schema({
   task: String
});

var taskPost =  mongoose.model("taskPost", taskPostSchema);

module.exports(taskPost);
