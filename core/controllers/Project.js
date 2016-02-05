module.exports = function(app) {
    /**
    *   @var getDb      Get Database Driver
    *   @var ProjectModel  Get Model Schema 
    */
    var getDb = app.core.lib.database;
    var ProjectModel = getDb.model('Project');
    var UserModel    = getDb.model('User');

    var controller = {

        findAll: function(req, res) {
            var query = ProjectModel.find();
                query.select('title id');
                query.exec(function(err, Project) {
                    if (err) return res.status(500).jsonp({
                        error: true,
                        message: 'Algum erro foi encontrado, tente novamente!',
                        debug: {
                            __error: err.message
                        }
                    });
                    return res.status(200).jsonp(getDb.__response(Project));
                });

        },

        new: function(req, res) {
            var userId = "56b4fcb6b271931010000001"
            var newProject = new ProjectModel({
                createdBy:      userId,
                title:          req.body.title,
                assigneds:      req.body.assigneds,
                dueDate:        req.body.dueDate,
                status:         req.body.status,
                priority:       req.body.priority,
                dependencies:   req.body.dependencies
            });

            newProject.save(function(err, Project) {
                if (err) return res.status(500).jsonp({
                    error: true,
                    message: 'Dados inválidos, tente novamente!',
                    debug: {
                        __error: err.message
                    }
                });

                UserModel.findByIdAndUpdate(
                    userId, {
                        $push: {
                            "projects": newProject._id.toString()
                        }
                    }, {
                        safe: true,
                        upsert: true,
                        new: true
                    },function(err){
                        console.log(err)
                    }
                );
                return res.status(200).jsonp(getDb.__response(Project));
            });
        },

        findById : function(req, res) {
            ProjectModel.findById(req.params.id)
            .populate('createdBy', 'name id -_id')
            .exec(function(err, Project) {
                if (err) return res.status(500).jsonp({
                    error: true,
                    message: 'Id inválido, tente novamente!',
                    debug: {
                        __error: err.message
                    }

                });

                return res.status(200).jsonp(getDb.__response(Project));
            });
        },

        update : function(req, res) {

            ProjectModel.findById(req.params.id, function(err, Project) {
                if(req.body.name)
                    Project.name = req.body.name;
                if(req.body.email)
                    Project.email = req.body.email;
                if(req.body.password)
                    Project.password = req.body.password

                Project.save(function(err) {
                    if (err) return res.status(500).jsonp({
                        error: true,
                        message: 'Dados inválidos, tente novamente!',
                        debug: {
                            __error: err.message
                        }
                    });
                    return res.status(200).jsonp({error: false, data: Project});
                });
            });
        },

        delete : function(req, res) {

            ProjectModel.remove({ _id: req.params.id }, function(err, Project) {
                if (err) return res.status(500).jsonp({
                    error: true,
                    message: 'Algum erro foi encontrado, tente novamente!',
                    debug: {
                        __error: err.message
                    }
                });
                return res.status(200).jsonp({error: false, data: Project});
            });
        }

    }

    return controller;
}
