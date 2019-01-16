const jwt = require('jsonwebtoken');
const config = require('../../config');

let tokenVerification = (req, res, next) => {
	let token = req.get('Authorization');
	jwt.verify( token, config.token_seed, (err, decoded) => {
		if ( err ) {
			return res.status(401).json({
				message: '¡Usuario no autorizado!',
				err
			});
		}

		req.user = decoded.user;
		next();
	});
}

module.exports = tokenVerification;