import express from 'express';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../webpack.config';

const app = express();

app.use(webpackDevMiddleware(webpack(webpackConfig)));

app.get('/react', function (req, res) {
	res.send('Hola');
});

app.listen(3000, function () {
	console.log('Servidor corriendo...');
});