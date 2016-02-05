module.exports = function(app) {

    var DB     = app.core.lib.database;

    var Model  = new DB.Schema({ createdAt: { type: Date, default: Date.now } ,

        createdBy : {
            type: DB.Schema.Types.ObjectId,
            ref: 'User'
        },
        
        title: {
            type: String,
            required: true
        },

        assigneds: {
            type: Array,
            required: true
        },

        dueDate: {
            type: Date,
            required: true
        },

        status: {
            type: String,
            enum: ['new', 'progress', 'test' , 'done'],
            default : 'new',
            required: true
        },

        priority: {
            type: String,
            enum: ['1', '2', '3' , '4'],
            default : '3',
            required: true
        },

        dependencies: {
            type: Array,
            required: true
        }

    },{
        versionKey: false
    });

    setModel = DB.__autoincrement(DB, 'Project', Model);

    
    return setModel;
};