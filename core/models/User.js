module.exports = function(app, mongoose) {

    var dbInstance  = app.core.lib.database;

    var UserModel   = new dbInstance.Schema({
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

    setModel = dbInstance.__autoincrement(dbInstance ,'User', UserModel);

    
    return setModel;
};