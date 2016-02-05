module.exports = function(app) {

    /*
     *	IMPORT MODELS AND CONTROLLERS
     */
    var UserController = app.core.controllers.User
    var ProjectController = app.core.controllers.Project



    app.route('/users')
        .get(UserController.findAll);

    app.route('/delete')
        .post(UserController.deleteAll);

    app.route('/auth/login')
        .post(UserController.login);

    app.route('/auth/register')
        .post(UserController.new);

    app.route('/user/:id')
        .get(UserController.findById)
        .put(UserController.update);


    /*
    * PROJECT ROUTES
    */
    app.route('/project/list')
        .get(ProjectController.findAll);
    app.route('/project/new')
        .post(ProjectController.new);
    app.route('/project/:id')
        .get(ProjectController.findById)
    app.route('/project/delete/:id')
        .get(ProjectController.delete)
};