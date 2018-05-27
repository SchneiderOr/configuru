const webpack = require('webpack');

const { createVariants } = require('parallel-webpack');

const { UglifyJsPlugin } = webpack.optimize;
const path = require('path');
const { env } = require('yargs').argv;

const pkg = require('./package.json');

const libraryName = pkg.name;

const isProd = env === 'build';
const plugins = isProd ? [new UglifyJsPlugin({ minimize: true })] : [];

function createMultipleConfigs({ target }) {
	return {
		target,
		entry: path.join(__dirname, '/lib/index.js'),
		devtool: 'source-map',
		output: {
			path: `${__dirname}/dist`,
			filename: `${libraryName}-${target}${isProd ? '.min.js' : '.js'}`,
			library: 'Configuru',
			libraryTarget: target === 'web' ? 'var' : 'umd',
			umdNamedDefine: target === 'node'
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
		plugins
	};
}

// To export the library to both browser and node
module.exports = createVariants({ target: ['web', 'node'] }, createMultipleConfigs);
