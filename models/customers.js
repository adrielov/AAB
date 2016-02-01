/**
 * Created by Oleg on 31.01.2016.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CustomerSchema = new Schema({
    name: {
        first: String,
        last: String,
    },
    dateOfBirth:{
        type:Date, default: Date.now
    } , //DateType,
    companyName:String,
    phone: {
        mobile: {
            type: String,
            trim: true,
            match: /[0-9]{3}[-]{0,1}[0-9]{3}[-]{0,1}[0-9]{2}[-]{0,1}[0-9]{2}/g}

    } ,// xxx-xxx-xx-xx,
    work:{
        type: String,
        trim: true,
        match: /[0-9]{3}[-]{0,1}[0-9]{3}[-]{0,1}[0-9]{2}[-]{0,1}[0-9]{2}/g
    },
    skype:String
});

module.exports = mongoose.model('Customer',CustomerSchema);