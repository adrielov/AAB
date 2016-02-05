module.exports = function(app) {

    var DB     = app.core.lib.database;

    var Model  = new DB.Schema({ createdAt: { type: Date, default: Date.now } ,

        projects : [{
            type: DB.Schema.Types.ObjectId,
            ref: 'Project'
        }],

        name: {
            type: String,
            required: true,
            trim: true,
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

    setModel = DB.__autoincrement(DB ,'User', Model);

    
    return setModel;
};