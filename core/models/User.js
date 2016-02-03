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
        score: {
            type: Number,
            index: {
                unique: true
            }
        },
        comment: {
            type: String
        },
    },{
        versionKey: false
    });

    mongoose.model('User', User);
    
    return mongoose;
};