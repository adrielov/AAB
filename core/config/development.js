module.exports = {

	title: 'Atmus Agile Board',
	host: 'localhost',
	port: 3000,
	application:{
		path_views_auth : '/public/views/auth',
		path_views_app  : '/public/views/application',
		path_views_projects  : '/public/views/projects'
	},
	session: {
		key 	: 'app.atmusagilboar.sid',
		keyCookie 	: 'sa4d8sa984sa984d9sa84d98s4d9sa84d9sa84d98d4sa',
	},
	databases : {
		mongodb : {
			 'url' : 'mongodb://127.0.0.1/aab'
			 //'url' : 'mongodb://atmus:11165535@ds055915.mongolab.com:55915/atmus'
		}
	}

};
