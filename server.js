var socketIo            = require('socket.io');
var express             = require('express');
var expressCookieParser = require('cookie-parser');
var expressSession      = require('express-session');
var load                = require('express-load');
var bodyParser          = require("body-parser");
var app                 = express();
var server              = require('http').createServer(app);


/*
 *  AUTO LOAD MODELS , CONTROLLERS AND ROUTES INDO APPLICATION INSTANCE
 *  AUTO LOAD CONFIG SERVER
 */


load('core/config').then('core/helpers').then('core/lib').then('core/models').into(app);

for (var environment in app.core.config) {
    if (environment == app.get('env')) {
        for (var key in app.core.config[environment]) {
            app.set(key, app.core.config[environment][key]);
        }
    }
}

var PORT =  app.get('port'),
    HOST =  app.get('host');

// We define the key of the cookie containing the Express SID
var EXPRESS_SID_KEY  = app.get('session').key;

// We define a secret string used to crypt the cookies sent by Express
var COOKIE_SECRET   = app.get('session').keyCookie;
var cookieParser    = expressCookieParser(COOKIE_SECRET);

// Create a new store in memory for the Express sessions
var sessionStore = new expressSession.MemoryStore();

// Configure Express app with :
// * Cookie Parser created above
// * Configure session
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cookieParser);
app.use(expressSession({
    store: sessionStore,        // We use the session store created above
    resave: false,              // Do not save back the session to the session store if it was never modified during the request
    saveUninitialized: false,   // Do not save a session that is "uninitialized" to the store
    secret: COOKIE_SECRET,      // Secret used to sign the session ID cookie. Must use the same as speficied to cookie parser
    name: EXPRESS_SID_KEY       // Custom name for the SID cookie
}));
// Configure routes
app.use(express.static("public"));
app.get('/', function (req, res) {
  if(!req.session.isLogged)
    res.sendFile(__dirname + app.get('application').path_views_auth  + '/index.html');
  else if(!req.session.selectedProject)
    res.sendFile(__dirname + app.get('application').path_views_projects + '/index.html');
  else
    res.sendFile(__dirname + app.get('application').path_views_app + '/index.html');
});
app.use('/app',express.static('public/app'));
app.use('/assets',express.static('public'));
load('core/controllers').then('core/routes.js').into(app);

app.get('/logout', function (req, res) {
    req.session.isLogged = false;
    req.session.selectedProject = false;
    delete req.session.username;

    res.redirect('/');
});

app.all('*', function(req, res) {
    res.status(500).send({error : true , message : 'Sem permissão de acesso!', redirect : 'home'});
});

// Create Socket.io server
var io = socketIo({
    // Optional Socket.io options
});

// Socket.IO 1 is now using middlewares
// We can use this functionnality to implement authentification
io.use(function(socket, next) {
    var request = socket.request;
    if(!request.headers.cookie) {
        // If we want to refuse authentification, we pass an error to the first callback
        return next(new Error('No cookie transmitted.'));
    }

    // We use the Express cookieParser created before to parse the cookie
    // Express cookieParser(req, res, next) is used initialy to parse data in "req.headers.cookie".
    // Here our cookies are stored in "request.headers.cookie", so we just pass "request" to the first argument of function
    cookieParser(request, {}, function(parseErr) {
        if(parseErr) { return next(new Error('Error parsing cookies.')); }

        // Get the SID cookie
        var sidCookie = (request.secureCookies && request.secureCookies[EXPRESS_SID_KEY]) ||
                        (request.signedCookies && request.signedCookies[EXPRESS_SID_KEY]) ||
                        (request.cookies && request.cookies[EXPRESS_SID_KEY]);

        // Then we just need to load the session from the Express Session Store
        sessionStore.load(sidCookie, function(err, session) {
            // And last, we check if the used has a valid session and if he is logged in
            if(session == undefined){
              console.log("sem session");
              return next(new Error('Session cannot be found/loaded'));
            }
            //console.log(session.cookie.isLogged)
            if (err) {
                return next(err);

            // Session is empty
            } else if(!session) {
                return next(new Error('Session cannot be found/loaded'));

            // Check for auth here, here is a basic example
            } else if (session.isLogged !== true) {
                return next(new Error('User not logged in'));

            // Everything is fine
            } else {
                // If you want, you can attach the session to the handshake data, so you can use it again later
                // You can access it later with "socket.request.session" and "socket.request.sessionId"
                request.session = session;
                request.sessionId = sidCookie;

                return next();
            }
        });
    });
});

// Start the socket.io server
io.listen(server);

// Upon connection, start a periodic task that emits (every 1s) the current timestamp
io.on('connection', function (socket) {
    // Just an exemple showing how to get data from the session
    // It's in the auth middleware we assigned the session data to "socket.request", we can then easily use it here
    socket.emit('welcome','Bem vindo '+ socket.request.session.username +'! Aqui está seu SID: '+ socket.request.sessionId);

    // An example event, sending the current timestamp every 1000 milliseconds (1s)
    var sender = setInterval(function () {
        socket.emit('myCustomEvent',socket.request.session.isLogged+' ultima atualização : '+ new Date().getTime());
    }, 1000);

    // On disconnect, clear the interval
    socket.on('disconnect', function() { 
        console.log('saiu')
        clearInterval(sender);
    });
});

server.listen(app.get('port'), function() {
    console.log('%s está em %s mode na porta %s', app.get('title'), app.get('env'), app.get('port'));
});