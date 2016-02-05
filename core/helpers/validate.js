module.exports = function(app) {
	
    var __helper = {

    	email : function(value) {
    		var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    		return re.test(value)
    	}
        
    }
    
    return __helper;
};