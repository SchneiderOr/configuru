// const Configuru = require('../dist/configuru.js-commonjs2')
const Configuru = require('../dist/configuru.js-commonjs2')
const expect = require('chai').expect;

// We need to test our library so that we we will know it works and prevent regression of
// changes in the future. How do you do it?
const client = new Configuru({ apiKey: 'orKey1234' });

// On config load, we got a callback with the config
client.on('loaded', config => {
	console.log(config)
})
// console.log(client.get('key2'))
client.on('fetching', () => console.log('fetching'))

