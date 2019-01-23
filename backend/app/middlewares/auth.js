const jwt = require('jsonwebtoken');
const objectID = require('mongodb').ObjectID;
const config = require('../../config');

let tokenVerification = (db) => {
	return (req, res, next) => {
		let token = req.get('Authorization').split(' ')[1];
		jwt.verify( token, config.token_seed, (err, decoded) => {
			if ( err ) {
				return res.status(401).json({
					message: '¡Usuario no autorizado!',
					err
				});
			}

			db.db().collection('users').findOne({ _id: new objectID(decoded.sub) }, (err, user) => {
				if (err) {
					return res.status(400).json({
						err
					});
				}
				
				req.user = user;
				next();
			});
		});
	}
}

module.exports = tokenVerification;