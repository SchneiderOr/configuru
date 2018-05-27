// @flow
import EventEmitter from 'events';
import { type, pathOr, propOr } from 'ramda';

import fetch from '../lib/utils/fetch';

interface options {
	apiKey: string; // When The library initilizes, it should expect a customer-key that we provide to our customers.
	apiUrl: string; // The library expect a url to the endpoint where the config is located, please notice that there are no security restrictions here since this is a small demo (currently mock server)
	config?: {};
}

export default class Configuru extends EventEmitter {
	isLoaded: boolean;
	apiKey: string;
	apiUrl: string;
	config: {};

	constructor(opts: options) {
		super();
		this.isLoaded = false;
		this.config = opts.config || {};
		this.apiKey = opts.apiKey;
		this.apiUrl = opts.apiUrl || 'http://localhost:3000';
		this.init();
	}

	// Handle caching it here.
	onConfigLoaded(data: {}) {
		this.isLoaded = true;
		this.config = data;
		this.emit('loaded', data);
	}

	/**
	 * The library won't block the execution of the app/service while getting the configuration from the server.
	 */
	async init() {
		const data = await fetch(`${this.apiUrl}/${this.apiKey}`);
		try {
			// this.emit('fetching');
			this.onConfigLoaded(data);
		} catch (err) {
			this.emit('error', err);
		}
	}

	/**
	 * Get the desired key or path from the config.
	 * @param {*string | string[]} key - the key to retrive from config
	 * @param {*} defaultValue - a default value to set when there is no such key
	 */
	get(key: string | string[], defaultValue: any): any {
		if (!key) return this.config;
		return type(key) === 'Array'
			? pathOr(defaultValue, key, this.config)
			: propOr(defaultValue, key, this.config);
	}
}
