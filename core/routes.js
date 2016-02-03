module.exports = function(app) {

    /*
     *	IMPORT MODELS AND CONTROLLERS
     */
    var UserController = app.core.controllers.User



    app.route('/UserScores')
        .get(UserController.findAll)
        .post(UserController.addUser);

    app.route('/delete')
        .post(UserController.deleteAll);

    app.route('/UserScores/:id')
        .get(UserController.findById)
        .put(UserController.updateUser);




};