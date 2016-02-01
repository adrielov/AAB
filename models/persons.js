/**
 * Created by Oleg on 01.02.2016.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PersonSchema = new Schema({
    name: {
        first: String,
        last: String,
    },
    dateOfBirth:{
        type:Date
    }
});

module.exports = mongoose.model('Person',PersonSchema);