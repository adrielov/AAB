module.exports = function(app, mongoose) {

    var dbInstance  = app.core.lib.database;

    var ProjectModel= new dbInstance.Schema({
        title: {
            type: String,
            required: true,
            index: {
                unique: true
            }
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

    setModel = dbInstance.__autoincrement(dbInstance, 'Project', ProjectModel);

    
    return setModel;
};