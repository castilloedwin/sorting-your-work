const objectID = require('mongodb').ObjectID;

const api = function (app, db) {

	app.get('/tasks', (req, res) => {
		db.db().collection('tasks').find({}).sort({ _id: -1 }).toArray((err, tasks) => {
			if (err) {
				return res.status(200).json({
					err
				});
			}

			return res.status(200).json(tasks);
		});
	});

	app.get('/tasks/:id', (req, res) => {
		const id = req.params.id;
		db.db().collection('tasks').findOne({ _id: new objectID(id) }, (err, task) => {
			if (err) {
				return res.status(200).json({
					err
				});
			}

			return res.status(200).json({
				message: 'Tarea encontrada',
				task
			})
		});
	});

	app.post('/tasks', (req, res) => {
		db.db().collection('tasks').insertOne(req.body, (err, task) => {
			if (err) {
				return res.status(500).json({
					err
				});
			}

			return res.status(201).json({
				message: 'Se creó correctamente la tarea',
				status: 201
			});
		});
	});

	app.delete('/tasks/:id', (req, res) => {
		const id = req.params.id;
		db.db().collection('tasks').deleteOne({ _id: new objectID(id) }, (err, task) => {
			if (err) {
				return res.status(200).json({
					err
				});
			}

			return res.status(200).json({
				message: 'Tarea eliminada',
				status: 200
			})
		});
	});

	app.post('/register', (req, res) => {
		let { username, password } = req.body;
		username = username.toLowerCase().replace(/\s/g, '-');
		
		if ( password.length <= 5 ) {
			return res.status(200).json({
				message: 'La contraseña debe tener más de 5 caracteres'
			});
		}

		const user = {
			username,
			name: req.body.name,
			last_name: req.body.last_name,
			email: req.body.email,
			password: req.body.password,
			create_at: new Date()
		}

		db.db().collection('users').insertOne(user, (err, user) => {
			if (err) {
				return res.status(500).json({
					err
				});
			}

			return res.status(200).json({
				message: 'Usuario creado satisfactoriamente',
				user,
				status: 200
			});
		});
	});
}

module.exports = api;