module.exports = function(app) {

    var dbInstance  = app.core.lib.database;

    var TesteModel   = new dbInstance.Schema({ createdAt: { type: Date, default: Date.now } ,
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

    setModel = dbInstance.__autoincrement(dbInstance ,'Teste', TesteModel);

    
    return setModel;
};