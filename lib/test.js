const Client = require('../dist/index');

const satan = new Client(123, {
	defaults: {
		is: false,
		app: {
			// need to deep merge?
			s: 11
		}
	}
});

satan.on('loaded', console.log);

// keep alive
process.stdin.on('data', () => {});
