const Client = require('../dist/index');

const satan = new Client(666, {
	defaults: {
		signup: true,
		app: { s: 11 }
	}
});

satan.on('fetching', () => console.log('fetching data'));

satan.on('loaded', config => {
	setImmediate(() => console.log('this happens asynchronously', config));
	console.log(satan.get(44));
});

satan.on('error', console.error);
// keep alive
process.stdin.on('data', () => {});
