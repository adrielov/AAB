//File: controllers/tvshows.js
var mongoose = require('mongoose');
var empleados  = mongoose.model('User');

//GET - Return all User scores in the the DB
exports.findAllUserScores = function(req, res) {
    empleados.find(function(err, User) {
        if(err) return res.send(500, {error : true , message : 'Algum erro foi encontrado, tente novamente!' , debug : { realError : err.message }});
        console.log('GET /UserScores')
  	res.status(200).jsonp(User);
    });
};

//GET - Return a User score for specified ID
exports.findById = function(req, res) {
	empleados.findById(req.params.id, function(err, User) {
            if(err) return res.send(500, {error : true , message : 'Id inválido, tente novamente!' , debug : { realError : err.message }});
            console.log('GET /UserScore/' + req.params.id);
	    res.status(200).jsonp(User);
	});
};

//POST - Insert a new User score in the DB
exports.addUserScore = function(req, res) {
	console.log('POST');
	console.log(req.body);
	var UserScore = new empleados({
		name:     req.body.name,
		score: 	  req.body.score,
		comment:  req.body.comment,
	});
	UserScore.save(function(err, User) {
		if(err) return res.send(500, {error : true , message : 'Dados inválidos, tente novamente!' , debug : { realError : err.message }});
        res.status(200).jsonp(User);
	});
};

//PUT - Update a an existing score
exports.updateUserScore = function(req, res) {
	empleados.findById(req.params.id, function(err, User) {
		User.name    = req.body.name;
		User.score   = req.body.score;
		User.comment = req.body.comment

		User.save(function(err) {
			if(err) return res.send(500, {error : true , message : 'Dados inválidos, tente novamente!' , debug : { realError : err.message }});
      		res.status(200).jsonp(User);
		});
	});
};

//POST - Delete all entries
exports.deleteAll = function(req, res) {
    empleados.remove({}, function(err, User) {
      	if(err) return res.send(500, {error : true , message : 'Algum erro foi encontrado, tente novamente!' , debug : { realError : err.message }});
      	res.status(200).jsonp(User);
   	});
};

