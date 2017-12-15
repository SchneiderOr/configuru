const fs = require('fs');
const del = require('del');
const { omit, keys, merge } = require('ramda');

const rollup = require('rollup');
const babel = require('rollup-plugin-babel');

const pkg = require('../package.json');

let promise = Promise.resolve();

// Clean up the output directory
promise = promise.then(() => del(['dist/*']));

// Compile source code into a distributable format with Babel
['es', 'cjs', 'umd'].forEach(format => {
	promise = promise.then(() =>
		rollup
			.rollup({
				input: 'lib/index.js',
				external: keys(pkg.dependencies),
				plugins: [
					babel(
						merge(pkg.babel, {
							babelrc: false,
							exclude: 'node_modules/**',
							runtimeHelpers: true,
							presets: pkg.babel.presets
						})
					)
				]
			})
			.then(bundle =>
				bundle.write({
					file: `dist/${format === 'cjs' ? 'index' : `index.${format}`}.js`,
					format,
					sourcemap: true,
					name: format === 'umd' ? pkg.name : undefined
				})
			)
	);
});

// Copy package.json and LICENSE.txt
promise = promise.then(() => {
	const pkgOmitted = omit(
		['private', 'devDependencies', 'scripts', 'eslintconfig', 'babel'],
		pkg
	);
	fs.writeFileSync('dist/package.json', JSON.stringify(pkgOmitted, null, '  '), 'utf-8');
});

promise.catch(err => console.error(err.stack)); // eslint-disable-line no-console
