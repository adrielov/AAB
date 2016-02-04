module.exports = function(app) {
    /**
    *   @var getDb      Get Database Driver
    *   @var UserModel  Get Model Schema 
    */
    var getDb = app.core.lib.database;
    var UserModel = getDb.model('User');

    var controller = {

        login : function(req , res) {
            var query = UserModel.findOne({ 'email': req.body.email ,'password': req.body.password });
                query.select('email name');
                query.exec(function(err, User) {
                    if (!User) return res.send(500, {
                        error: true,
                        message: 'Dados inválidos, tente novamente!',
                        debug : {
                            __error : ((err)?err.message:null)
                        }
                    });
                    res.status(200).jsonp(User);
                });
        },

        findAll: function(req, res) {

            UserModel.find(function(err, User) {
                if (err) return res.send(500, {
                    error: true,
                    message: 'Algum erro foi encontrado, tente novamente!',
                    debug: {
                        __error: err.message
                    }
                });
                res.status(200).jsonp(User);
            });

        },

        addUser : function(req, res) {

            var newUser = new UserModel({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
            });
            newUser.save(function(err, User) {
                if (err) return res.send(500, {
                    error: true,
                    message: 'Dados inválidos, tente novamente!',
                    debug: {
                        __error: err.message
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
                        __error: err.message
                    }
                });
                res.status(200).jsonp(User);
            });
        },

        update : function(req, res) {

            UserModel.findById(req.params.id, function(err, User) {
                if(req.body.name)
                    User.name = req.body.name;
                if(req.body.email)
                    User.email = req.body.email;
                if(req.body.password)
                    User.password = req.body.password

                User.save(function(err) {
                    if (err) return res.send(500, {
                        error: true,
                        message: 'Dados inválidos, tente novamente!',
                        debug: {
                            __error: err.message
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
                        __error: err.message
                    }
                });
                res.status(200).jsonp(User);
            });
        }

    }

    return controller;
}
