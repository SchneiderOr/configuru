import Client from '../lib'
const expect = require('chai').expect;

const client = new Client({ apiKey: 'orKey1234' });
client.on('loaded',()=>console.log('xx'))
client.on('fetching',()=>console.log('xxxxs'))
client.on('fetching', () => console.log('fetching'))
// describe('test', () => {
// 	let client;
// 	let config;
// 	before(initMockServer)
// 	beforeEach(() => {
// 		client = new Client('orKey1234'); // mock key, mock server.
// 		// console.log('Mock Client is started')
// 		// client.on('loaded', data => config = data)
// 	});

// 	// it('Should return the value for the config key working', (done) => {
// 	// 	console.log(config)
// 	// 	done(config)
// 	// })

// })

