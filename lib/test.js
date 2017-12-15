console.log('before');

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

function tryIt() {
	if (satan.isLoaded) {
		console.log(satan.get());
		return satan;
	} else {
		setTimeout(function() {
			tryIt();
		}, 0);
	}
}

tryIt();
console.log('end');
