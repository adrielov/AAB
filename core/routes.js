module.exports = function(app) {

    /*
     *	IMPORT MODELS AND CONTROLLERS
     */
    var UserController = app.core.controllers.User;
    var ProjectController = app.core.controllers.Project;
    var checkAuth = function(req , res , next) {
        if(req.session.isLogged) {
            next();
        } else {
            res.status(500).send({error : true , message : 'Sem permissão de acesso!', redirect : 'home'});
        }
    }

    /*
    *   AUTH ROUTES
    */
    app.route('/auth/login')
        .post(UserController.login);
    app.route('/auth/register')
        .post(UserController.new);

    /*
    *   USER ROUTES
    */
    app.route('/user/list')
        .get(checkAuth,UserController.findAll);
    app.route('/user/:id')
        .get(checkAuth,UserController.findById)
        .put(checkAuth,UserController.update);
    app.route('/user/delete/:id')
        .post(checkAuth,UserController.delete);

    /*
    * PROJECT ROUTES
    */
    app.route('/project/list')
        .get(checkAuth,ProjectController.findAll);
    app.route('/project/change')
        .get(checkAuth,ProjectController.change);
    app.route('/project/new')
        .post(checkAuth,ProjectController.new);
    app.route('/project/select/:id')
        .get(checkAuth,ProjectController.select)
    app.route('/project/:id')
        .get(checkAuth,ProjectController.findById)
        .put(checkAuth,ProjectController.update);
    app.route('/project/delete/:id')
        .get(checkAuth,ProjectController.delete)
};