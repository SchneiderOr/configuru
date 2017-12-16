import fetch from 'isomorphic-fetch';
import cache from './cache';

let fetchThru = (url, { onBeforeCache, cacheName }) => {
	console.log('not exist on cache');
	return new Promise((resolve, reject) => {
		fetch(url)
			.then(response => {
				response
					.json()
					.then(body => {
						let data = body;
						if (onBeforeCache) data = onBeforeCache(body);
						cache.set(url, data);
						resolve(data);
					})
					.catch(error => reject(error));
			})
			.catch(error => reject(error));
	});
};

export default (url: string, opts: {} = {}) =>
	opts.readThru
		? fetchThru(url, opts)
		: new Promise((resolve, reject) => {
				cache.get(url, (err, value) => {
					return err || value == undefined
						? fetchThru(url, opts)
								.then(response => resolve(response))
								.catch(error => reject(error))
						: resolve(value) && console.log('from cache', value);
				});
			});

// // async function
// export default (async function requestor(url: string, opts: {} = {}) {
// 	// await response of fetch call
// 	const response = await fetch(url, opts);
// 	// only proceed once promise is resolved
// 	const data = await response.json();
// 	// only proceed once second promise is resolved
// 	return data;
// });
