import fetch from 'isomorphic-fetch';
import cache from './cache';

// We can fetch thru by passing option to config
const fetchThru = async (url, { onBeforeCache }) => {
	// console.log('not exist on cache');
	const response = await fetch(url);
	let data = await response.json();
	if (onBeforeCache) data = onBeforeCache(data);
	cache.set(url, data);
	return data;
};

export default (url: string, opts: {} = {}) =>
	opts.readThru
		? fetchThru(url, opts)
		: new Promise((resolve, reject) => {
				cache.get(
					url,
					(err, value) =>
						err || value === undefined
							? fetchThru(url, opts)
									.then(response => resolve(response))
									.catch(error => reject(error))
							: resolve(value)
				);
			});
