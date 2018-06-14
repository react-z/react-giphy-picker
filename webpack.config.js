const path = require('path');
const webpack = require('webpack');

// no externals for backwards compatibility
module.exports = {
	entry: path.resolve(__dirname, 'src'),
	output: {
		path: path.resolve(__dirname, 'lib'),
		filename: 'Picker.js',
		library: 'Picker',
		libraryTarget: 'umd',
	},
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				include: [
					path.resolve(__dirname, 'src'),
				],
				loader: 'babel-loader',
			},
		],
	},
	resolve: {
		extensions: ['.js', '.jsx'],
	},
	plugins: [
		new webpack.DefinePlugin({
			NODE_ENV: JSON.stringify(process.env.NODE_ENV),
		}),
		new webpack.optimize.UglifyJsPlugin(),
	],
};