const Configuru = require('../dist/configuru-node');
// We need to test our library so that we we will know it works and prevent regression of
// changes in the future. How do you do it?
const client = new Configuru({ apiKey: 'orKey1234' });
console.log('Welcoem to configuru demo');
console.log('We initilized the library alocating it to the client const');
console.log('Some usful statics are client.config, client.isLoaded');
console.log('------------------------------------------------------');
// We can check if the config is loaded from the server by accessing .isLoaded
console.log('checking if the config is loaded:', client.isLoaded);

// On config load, we got a callback with the config
client.on('loaded', config => {
	console.log('checking if the config is loaded:', client.isLoaded);

	console.log('initial config from server\n', config);
	// Get a value by single key
	console.info('Get the value for key1', client.get('key1'));
	// And default value also can be specified if key dosent exist or empty
	console.info(
		'Get the value and prepare default value for key12345 (that is not yet exist)',
		client.get('key2', false)
	);
	// Get a value by path
	console.info('Get the value for the path key4.nested:', client.get(['key4', 'nested']));
	// Get a value by path
	console.info(
		'Get the value for the path what.is.the.answer:',
		client.get(['what', 'is', 'the', 'answer'])
	);
});

client.on('error', console.error);
process.stdin.on('data', () => {});
