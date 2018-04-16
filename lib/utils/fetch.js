import fetch from 'isomorphic-fetch';

// We can fetch thru by passing option to config
const fetchThru = async (url, { onBeforeCache }) => {
	const response = await fetch(url);
	let data = await response.json();
	if (onBeforeCache) data = onBeforeCache(data);
	return data;
};

export default (url: string, opts: {} = {}) => fetchThru(url, opts);
