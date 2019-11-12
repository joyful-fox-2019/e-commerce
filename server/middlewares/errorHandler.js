const validationErr = require('../helpers/validationErr');

module.exports = {
    errorHandler: function(error, req, res, next) {
        console.log(JSON.stringify(error, null, 2))
        console.log(error)
        let statusCode;
        let messageError = [];
        // }else if(error.name === 'JsonWebTokenErron')

        switch (error.name) {
			case 'ValidationError':
                statusCode = 422;
                messageError = validationErr(error);
                break;
			default:
                statusCode = error.status || 500;
                messageError = error.msg || 'Internal Server Error';
				break;
        }
        
        res.status(statusCode).json({
            message : messageError
        })
    }
}