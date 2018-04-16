// @flow
import EventEmitter from 'events';
import { type, pathOr, propOr } from 'ramda';

import fetch from '../lib/utils/fetch';

interface options {
	apiKey: string;
	apiUrl: string;
}

export default class Configuru extends EventEmitter {
	isLoaded: boolean;
	apiKey: string;
	apiUrl: string;
	config: {};

	constructor(opts: options) {
		super();
		this.isLoaded = false;
		this.apiKey = opts.apiKey;
		this.apiUrl = opts.apiUrl || "http://localhost:3000";
		this.emit('fetching');
		this.initConfig();
	}

	onConfigLoaded(data: {}) {
		this.isLoaded = true;
		this.config = data;
		// console.log(this.isLoaded, this.config)
		this.emit('loaded', data);
	}

	async initConfig() {
		const data = await fetch(`${this.apiUrl}/${this.apiKey}`);
		// console.log(data)
		try {
			this.onConfigLoaded(data);
		} catch (err) {
			this.emit('error', err);
		}
	}

	get(key: string | string[], defaultValue: any): any {
		if (!key) return this.config;
		return type(key) === 'Array'
			? pathOr(defaultValue, key, this.config)
			: propOr(defaultValue, key, this.config);
	}
}
