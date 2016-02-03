exports = module.exports = function(app, mongoose) {
	var User = new mongoose.Schema({
			name:		{ type: String , required: true, index: { unique: true} },
			score: 		{ type: Number, index: { unique: true} },
			comment:   	{ type: String },
		} , {
	    	versionKey: false // You should be aware of the outcome after set to false
		});

	mongoose.model('User', User);
};
