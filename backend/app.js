const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const config = require('./config');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

MongoClient.connect(config.database, { useNewUrlParser: true }, (err, database) => {
	if (err) throw err;

	require('./routes/api')(app, database);

	app.listen(config.port, () => {
		console.log('Server on port ' + config.port);
	});

});