const webpack = require('webpack');
const createVariants = require('parallel-webpack').createVariants

const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;
const path = require('path');
const env = require('yargs').argv.env; // use --env with webpack 2
const pkg = require('./package.json');

let libraryName = pkg.name;

let plugins = [];

if (env === 'build') {
	plugins.push(new UglifyJsPlugin({ minimize: true }));
	outputFile = libraryName + '.min.js';
} else {
	outputFile = libraryName + '.js';
}

function createMultipleConfigs({ target }) {
	return {
		target: "node",
		entry: __dirname + '/lib/index.js',
		devtool: 'source-map',
		output: {
			path: __dirname + '/dist',
			filename: outputFile + '-' + target + '.js',
			library: "Configuru",
			libraryTarget: target,
			umdNamedDefine: target === "umd"
		},
		module: {
			rules: [
				{
					test: /(\.jsx|\.js)$/,
					loader: 'babel-loader',
					exclude: /(node_modules|bower_components)/
				},
				{
					test: /(\.jsx|\.js)$/,
					loader: 'eslint-loader',
					exclude: /node_modules/
				}
			]
		},
		resolve: {
			modules: [path.resolve('./node_modules'), path.resolve('./lib')],
			extensions: ['.json', '.js']
		},
		plugins: plugins
	};
}

// To export the library to both browser and node
module.exports = createVariants({
	target: ['var', 'commonjs2', 'umd']
}, createMultipleConfigs);
