import express from 'express';
import webpack from 'webpack';
import path from 'path';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config';

const app = express();

app.use(webpackDevMiddleware(webpack(webpackConfig)));

app.use(express.static( path.join(__dirname, 'client') ));

app.get('*', function (req, res) {
	res.sendFile(path.resolve(__dirname, 'client', 'index.html'), function (err) {
		if (err) res.status(500).send(err);
	});
});

app.listen(3000, function () {
	console.log('Server Running...');
});