module.exports = function(app) {

    const getDb         = require('mongoose');
    const session       = require('express-session');
    const MongoStore    = require('connect-mongo')(session);
    const autoIncrement = require('mongoose-auto-increment');

    app.use(session({
        secret: app.core.config.development.session.key,
        resave: false,
        saveUninitialized: true,
        store: new MongoStore({
            mongooseConnection: getDb.connection
        })
    }));

    var connection = getDb.connect(app.core.config.development.databases.mongodb.url, function(err, res) {
        if (err) throw err;
        console.log('Connected to Database');
    });

    autoIncrement.initialize(connection);

    connection.__autoincrement = function(db, modelName, model) {

        model.plugin(autoIncrement.plugin, {
            model: modelName,
            field: 'id',
            startAt: 100
        });

        return db.model(modelName, model);
    }

    connection.__response = function(res) {
        console.log(res)
        var numRows = (res == null) ? 0: res.length;
        return {
            error: false,
            data: {
                message: (numRows != 0) ? undefined : "Nenhum dado encontrado!",
                count: numRows,
                rows: (numRows == 0) ? undefined : res
            }
        }
    }

    return connection;
};