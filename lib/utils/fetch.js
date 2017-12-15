require('isomorphic-fetch');

// async function
export default (async function requestor(url) {
	// await response of fetch call
	const response = await fetch(url);
	// only proceed once promise is resolved
	const data = await response.json();
	// only proceed once second promise is resolved
	return data;
});
