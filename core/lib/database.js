module.exports = function(app) {
    var getDb = require('mongoose');
	const session = require('express-session');
	const MongoStore = require('connect-mongo')(session);

	app.use(session({
	    secret: 'app.session',
	    resave: false ,
	  	saveUninitialized: true,
	    store: new MongoStore({ mongooseConnection: getDb.connection })
	}));


    getDb.connect('mongodb://127.0.0.1/aab', function(err, res) {
        if (err) throw err;
        console.log('Connected to Database');
    });
    return getDb;
};