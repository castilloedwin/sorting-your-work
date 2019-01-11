const path = require('path');
import webpack from 'webpack';
import htmlWebpackPlugin from 'html-webpack-plugin';
import LiveReloadPlugin from 'webpack-livereload-plugin';

export default {
	entry: path.join(__dirname, '/src/client/index.js'),
	output: {
		path: path.join(__dirname, '/dist'),
		filename: 'bundle.js'
	},
	mode: 'development',
	module: {
		rules: [
			{
				use: { loader: 'babel-loader' },
				test: /\.js$/,
				exclude: /node_modules/
			},
			{
				use: ['style-loader', 'css-loader'],
				test: /\.css$/
			},
			{
				test: /\.scss$/,
				use: [
					{
						loader: 'style-loader'
					},
					{
						loader: 'css-loader', options: {
							sourceMap: true
						}
					},
					{
						loader: 'sass-loader', options: {
							sourceMap: true
						}
					}
				]
			}
		]
	},
	plugins: [
		new htmlWebpackPlugin({
			template: path.join(__dirname, '/src/client/index.html')
		}),
		new LiveReloadPlugin()
	]
}