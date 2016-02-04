exports = module.exports = function(app, mongoose) {

    var mongoose = app.core.lib.database;
    var User = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },
        email: {
            type: String,
            required: true,
            index: {
                unique: true
            }
        },
        password: {
            type: String,
            required: true
        },
    },{
        versionKey: false
    });

    mongoose.model('User', User);
    
    return mongoose;
};