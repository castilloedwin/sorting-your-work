const objectID = require('mongodb').ObjectID;

const api = function (app, db) {

	app.get('/tasks', (req, res) => {
		db.db().collection('tasks').find({}).sort({ _id: -1 }).toArray((err, tasks) => {
			if (err) {
				return res.status(200).json({
					message: 'No se encontró esta colección'
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
					message: 'No se encontró esta tarea'
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
					message: 'No se pudo crear la tarea',
					status: 500
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
					message: 'No se encontró esta tarea'
				});
			}

			return res.status(200).json({
				message: 'Tarea eliminada',
				status: 200
			})
		});
	});
}

module.exports = api;