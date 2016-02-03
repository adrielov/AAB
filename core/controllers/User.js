module.exports = function(app) {
    /**
    *   @var getDb      Get Database Driver
    *   @var UserModel  Get Model Schema 
    */
    var getDb = app.core.lib.database;
    var UserModel = getDb.model('User');
    var controller = {

        findAll: function(req, res) {

            UserModel.find(function(err, User) {
                if (err) return res.send(500, {
                    error: true,
                    message: 'Algum erro foi encontrado, tente novamente!',
                    debug: {
                        realError: err.message
                    }
                });
                res.status(200).jsonp(User);
            });

        },

        addUser : function(req, res) {

            var UserScore = new UserModel({
                name: req.body.name,
                score: req.body.score,
                comment: req.body.comment,
            });
            UserScore.save(function(err, User) {
                if (err) return res.send(500, {
                    error: true,
                    message: 'Dados inválidos, tente novamente!',
                    debug: {
                        realError: err.message
                    }
                });
                res.status(200).jsonp(User);
            });
        },

        findById : function(req, res) {

            UserModel.findById(req.params.id, function(err, User) {
                if (err) return res.send(500, {
                    error: true,
                    message: 'Id inválido, tente novamente!',
                    debug: {
                        realError: err.message
                    }
                });
                res.status(200).jsonp(User);
            });
        },

        updateUser : function(req, res) {

            UserModel.findById(req.params.id, function(err, User) {
                User.name = req.body.name;
                User.score = req.body.score;
                User.comment = req.body.comment

                User.save(function(err) {
                    if (err) return res.send(500, {
                        error: true,
                        message: 'Dados inválidos, tente novamente!',
                        debug: {
                            realError: err.message
                        }
                    });
                    res.status(200).jsonp(User);
                });
            });
        },

        deleteAll : function(req, res) {

            UserModel.remove({}, function(err, User) {
                if (err) return res.send(500, {
                    error: true,
                    message: 'Algum erro foi encontrado, tente novamente!',
                    debug: {
                        realError: err.message
                    }
                });
                res.status(200).jsonp(User);
            });
        }

    }

    return controller;
}
