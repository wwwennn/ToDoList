var bodyParser = require('body-parser');
var mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://serene:433584@ds163397.mlab.com:63397/todolist');

// create the schema - this is just like a blueprint
var todoSchema = new mongoose.Schema({
	item: String
});

var Todo = mongoose.model('Todo', todoSchema);


// var data = [{item: 'get milk'}, {item: 'walk dog'}, {item: 'kick some coding ass'}];
var urlencodedParser = bodyParser.urlencoded({extended:false});

module.exports = function(app){
	// get data from mongoDB and pass it to the view
	app.get('/todo', function(req, res){
		Todo.find({}, function(err, data){
			if(err) throw err;
			res.render('todo', {todos: data});
		});
	});

	app.post('/todo', urlencodedParser, function(req, res){
		// get data from the view and add it to mongoDB
		var newTodo = Todo(req.body).save(function(err, data){
			if(err) throw err;
			res.json(data);
		});
		// data.push(req.body);
		// res.json(data);
	});

	app.delete('/todo/:item', function(req, res){
		// delete the requested item from mongoDB
		Todo.find({item: req.params.item.replace(/\-/g, " ")}).remove(function(err, data){
			if(err) throw err;
			res.json(data);
		})
		// data = data.filter(function(todo){
		// 	return todo.item.replace(/ /g, '-') !== req.params.item;
		// });
		// res.json(data);
	});
};