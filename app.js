var express = require('express');
var helmet = require('helmet');
var mongoose = require('mongoose');
var Customer = require('./models/customers');
var Person = require('./models/persons');
var bodyParser = require('body-parser');
var app = express();
app.use(helmet());

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

var port = process.env.PORT || 3000;        // set our port
mongoose.connect('mongodb://localhost:27017/customers');

app.use(logErrors);
app.use(clientErrorHandler);
app.use(errorHandler);

function logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
};
function clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
        res.status(500).send({error: 'Client side error'});
    } else {
        next(err);
    }
};
function errorHandler(err, req, res, next) {
    res.status(500);
    res.render('error', {error: err});
}

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router();              // get an instance of the express Router

// middleware to use for all requests
router.use(function (req, res, next) {
    // do logging
    console.log('Something is happening.');
    next(); // make sure we go to the next routes and don't stop here
});

// welcome (accessed at GET http://localhost:3000/api)
router.get('/', function (req, res) {
    res.json({message: 'hoohoo! welcome to our api!'});
});

router.route('/customers')
    // create a customer (accessed at POST http://localhost:8080/api/customers)
    .post(function (req, res) {

        var customer = new Customer();      // create a new instance of the Customer model
        customer.name.first = req.body.name.first;  // set the customers name (comes from the request)
        customer.name.last = req.body.name.last;
        customer.dateOfBirth = req.body.dateOfBirth;
        customer.companyName = req.body.companyName;  // set the customers name (comes from the request)
        customer.phone.mobile = req.body.phone.mobile;
        customer.phone.work = req.body.phone.work;
        customer.skype = req.body.skype;


        // save the customer and check for errors
        customer.save(function (err) {
            if (err)
                res.send(err);

            res.json({message: 'customer created!'});
        });
    })
    // get all the customers (accessed at GET http://localhost:8080/api/customers)
    .get(function (req, res) {
        Customer.find(function (err, customers) {
            if (err)
                res.send(err);

            res.json(customers);
        });
    });

// on routes that end in /customers/:customer_id
// ----------------------------------------------------
router.route('/customers/:customer_id')

    // get the customer with that id (accessed at GET http://localhost:3000/api/customers/:customer_id)
    .get(function (req, res) {
        Customer.findById(req.params.customer_id, function (err, customer) {
            if (err)
                res.send(err);
            res.json(customer);
        });
    })
    // update the customer with this id (accessed at PUT http://localhost:3000/api/customers/:customer_id)
    .put(function (req, res) {

        // use our customer model to find the customer we want
        Customer.findById(req.params.customer_id, function (err, customer) {

            if (err)
                res.send(err);

            // update the customers info
            customer.name.first = req.body.name.first;
            customer.name.last = req.body.name.last;
            customer.dateOfBirth = req.body.dateOfBirth;
            customer.companyName = req.body.companyName;
            customer.phone.mobile = req.body.phone.mobile;
            customer.phone.work = req.body.phone.work;
            customer.skype = req.body.skype;

            // save the customer
            customer.save(function (err) {
                if (err)
                    res.send(err);

                res.json({message: 'Customer updated!'});
            });
        });
    })

    // delete the customer with this id (accessed at DELETE http://localhost:3000/api/customers/:customer_id)
    .delete(function (req, res) {
        Customer.remove({
            _id: req.params.customer_id
        }, function (err, customer) {
            if (err)
                res.send(err);

            res.json({message: 'Successfully deleted'});
        });
    });


// Persons API
router.route('/persons')
    // create a person (accessed at POST http://localhost:3000/api/persons)
    .post(function (req, res) {

        var person = new Person();      // create a new instance of the Customer model
        person.name.first = req.body.name.first;  // set the customers name (comes from the request)
        person.name.last = req.body.name.last;
        person.dateOfBirth = req.body.dateOfBirth;

        // save the customer and check for errors
        person.save(function (err) {
            if (err)
                res.send(err);

            res.json({message: 'person created!'});
        });
    })
    // get all the persons (accessed at GET http://localhost:3000/api/persons)
    .get(function (req, res) {
        Person.find(function (err, persons) {
            if (err)
                res.send(err);

            res.json(persons);
        });
    });

// ----------------------------------------------------
router.route('/persons/:person_id')

    // get the person with that id (accessed at GET http://localhost:3000/api/persons/:person_id)
    .get(function (req, res) {
        Person.findById(req.params.person_id, function (err, person) {
            if (err)
                res.send(err);
            res.json(person);
        });
    })
    // update the person with this id (accessed at PUT http://localhost:3000/api/persons/:person_id)
    .put(function (req, res) {

        // use our person model to find the person we want
        Person.findById(req.params.person_id, function (err, person) {

            if (err)
                res.send(err);

            person.name.first = req.body.name.first;  // set the person name (comes from the request)
            person.name.last = req.body.name.last;
            person.dateOfBirth = req.body.dateOfBirth;

            // save the person
            person.save(function (err) {
                if (err)
                    res.send(err);

                res.json({message: 'Person updated!'});
            });
        });
    })

    // delete the person with this id (accessed at DELETE http://localhost:3000/api/persons/:persons_id)
    .delete(function (req, res) {
        Person.remove({
            _id: req.params.person_id
        }, function (err, person) {
            if (err)
                res.send(err);
            res.json({message: 'Person successfully deleted'});
        });
    });

// all of our routes will be prefixed with /api
app.use('/api', router);

app.listen(port, function () {
    console.log('Server started and listening on ' + port + ' port ...');
});