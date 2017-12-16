const Client = require('../dist/index');

const satan = new Client(123, {
	defaults: {
		signup: true,
		app: { s: 11 }
	}
});

satan.on('fetching', console.log);

satan.on('loaded', config =>
	setImmediate(() => console.log('this happens asynchronously', config))
);

console.log('re fetch');
satan.loadFromServer();

setTimeout(function() {
	console.log(satan.get('login'));
}, 3000);
// keep alive
process.stdin.on('data', () => {});
