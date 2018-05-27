import fetch from 'isomorphic-fetch';

export default async (url, opts) => {
	const response = await fetch(url, opts);
	const data = await response.json();
	return data;
};
