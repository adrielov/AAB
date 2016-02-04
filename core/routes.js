module.exports = function(app) {

    /*
     *	IMPORT MODELS AND CONTROLLERS
     */
    var UserController = app.core.controllers.User



    app.route('/users')
        .get(UserController.findAll);

    app.route('/delete')
        .post(UserController.deleteAll);

    app.route('/auth/login')
        .post(UserController.login);

    app.route('/auth/register')
        .post(UserController.addUser);

    app.route('/user/:id')
        .get(UserController.findById)
        .put(UserController.update);




};