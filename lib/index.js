// @flow
import EventEmitter from 'events';
import { type, pathOr, propOr } from 'ramda';

import fetch from '../lib/utils/fetch';

interface options {
	apiKey: string; // 1. The library initialization should expect a customer-key that we provide to our customers.
	apiUrl: string; // 3. The library should get the configuration from our servers. (currently mock server)
}

export default class Configuru extends EventEmitter {
	isLoaded: boolean;
	apiKey: string;
	apiUrl: string;
	config: {};

	constructor(opts: options) {
		console.log('ok ok');
		super();
		this.isLoaded = false;
		this.apiKey = opts.apiKey;
		this.apiUrl = opts.apiUrl || 'http://localhost:3000';
		this.emit('fetching');
		this.init();
	}

	onConfigLoaded(data: {}) {
		this.isLoaded = true;
		this.config = data;
console.log('x')
		this.emit('loaded', data);
	}

	// 6. The library should not block the execution of the app/service while getting the configuration from the server.
	async init() {
		// 5. Every time the library is initialized, it should get the configuration file from the server (since it might have been updated)
		const data = await fetch(`${this.apiUrl}/${this.apiKey}`);
		try {
			this.onConfigLoaded(data);
		} catch (err) {
			this.emit('error', err);
		}
	}

	// 2. The library needs to expose a method that returns a single value based on a key.
	// 7. The library should expose a way to get a default value. In case there is no locally cached configuration (e.g. first time ever, the app/service starts), and the customer code requests a value for a key before the response from the servers arrived.
	get(key: string | string[], defaultValue: any): any {
		if (!key) return this.config;
		return type(key) === 'Array'
			? pathOr(defaultValue, key, this.config)
			: propOr(defaultValue, key, this.config);
	}
}
