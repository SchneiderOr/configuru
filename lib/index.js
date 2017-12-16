import { type, pathOr, propOr, merge } from 'ramda';
import Requestor from '../lib/utils/fetch';

const EventEmitter = require('events');

export default class Configuru extends EventEmitter {
	constructor(apiKey, opts) {
		super();
		this.isLoaded = false;
		this.apiKey = apiKey;
		this.options = opts;
		Requestor('http://demo8397591.mockable.io/config').then(data => {
			const configData = data.payload[this.apiKey];
			this.config = opts.defaults ? merge(opts.defaults, configData) : configData;
			this.isLoaded = true;
			this.emit('loaded', this.config);
		});
	}

	get(key: string | string[], defaultValue: any): {} {
		if (!key) return this.config;
		return type(key) === 'Array'
			? pathOr(key, defaultValue, this.config)
			: propOr(key, defaultValue, this.config);
	}
}
