var express     = require("express"),
    load        = require("express-load"),
    app         = express(),
    bodyParser  = require("body-parser"),
    server      = require('http').createServer(app),
    appPath     = 'core/';

/*
 *	PATH FOR HTML FILES
 */
app.use(express.static("public"));
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());
app.use('/',express.static('public/html'));
app.use('/app',express.static('public/app'));
app.use('/assets',express.static('public'));

/*
 *  AUTO LOAD MODELS , CONTROLLERS AND ROUTES INDO APPLICATION INSTANCE
 *	AUTO LOAD CONFIG SERVER
 */

load('core/config').then('core/helpers').then('core/lib').then('core/models').into(app);
load('core/controllers').then('core/routes.js').into(app);

for (var environment in app.core.config) {
    if (environment == app.get('env')) {
        for (var key in app.core.config[environment]) {
            app.set(key, app.core.config[environment][key]);
        }
    }
}

server.listen(app.get('port'), function() {
    console.log('%s está em %s mode na porta %s', app.get('title'), app.get('env'), app.get('port'));
});