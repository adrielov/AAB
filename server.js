var express         = require("express"),
    app             = express(),
    bodyParser      = require("body-parser"),
    mongoose        = require('mongoose');

mongoose.connect('mongodb://127.0.0.1/template', function(err, res) {
  if(err) throw err;
  console.log('Connected to Database');
});

// Path for html files
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Import Models and controllers
var models     = require('./models/User')(app, mongoose);
var UserController = require('./controllers/User');

// API router
var router = express.Router();
app.use(router);



router.route('/UserScores')
  .get(UserController.findAllUserScores)
  .post(UserController.addUserScore);

router.route('/delete')
  .post(UserController.deleteAll);

router.route('/UserScores/:id')
  .get(UserController.findById)
  .put(UserController.updateUserScore);



app.use('/api', router);

// Start server
app.listen(process.env.PORT || 5000, function() {
  console.log("Node server running on http://localhost:5000");
});
