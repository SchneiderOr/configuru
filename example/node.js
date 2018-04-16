const Configuru = require('../dist/configuru.js-commonjs2')
// We need to test our library so that we we will know it works and prevent regression of
// changes in the future. How do you do it?
const client = new Configuru({ apiKey: 'orKey1234' })

client.on('fetching', () => console.log('fetching'))

// We can check if the config is loaded from the server by accessing .isLoaded
console.log('isLoaded:', client.isLoaded)

// On config load, we got a callback with the config
client.on('loaded', config => {
	console.log('initial config from server', JSON.stringify(config))
	// Get a value by single key
	console.log(client.get('key1'))
	// And default value also can be specified if key dosent exist or empty
	console.log(client.get('key2', false))
	// Get a value by path
	console.log(client.get(['key4', 'nested']))
})

client.on('error', console.error)

// get is astnc so we need to wait for loading before accessing it
setTimeout(() => {
	console.log(client.get('key1', false))
}, 3000)

process.stdin.on("data", () => { })


