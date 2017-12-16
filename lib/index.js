import { type, pathOr, propOr, merge } from 'ramda';
import Requestor from '../lib/utils/fetch';

export default class Configuru {
	constructor(apiKey, opts) {
		this.isLoaded = false;
		this.apiKey = apiKey;
		this.options = opts;
		Requestor('http://demo8397591.mockable.io/config').then(data => {
			const configData = data.payload[this.apiKey];
			this.config = opts.defaults ? merge(opts.defaults, configData) : configData;
			this.isLoaded = true;
		});
	}

	get(key: string | string[], defaultValue: any): {} {
		if (!key) return this.config;
		return type(key) === 'Array'
			? pathOr(key, defaultValue, this.config)
			: propOr(key, defaultValue, this.config);
	}
}
