module.exports = {

	title: 'Atmus Agile Board',
	port: 3000,
	portSocket : 3001,
	database : {
		drivers : {
			mongodb : {
				 'url' : 'mongodb://atmus:11165535@ds055915.mongolab.com:55915/atmus'
			}
		}
	}

};
