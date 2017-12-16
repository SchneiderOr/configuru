// @flow
import { type, prop, pathOr, propOr, merge } from 'ramda';
import fetch from '../lib/utils/fetch';

const EventEmitter = require('events');
const API_ENDPOINT = 'http://localhost:3000';

export default class Configuru extends EventEmitter {
	isLoaded: boolean;
	apiKey: string;
	options: {};
	config: {};

	constructor(apiKey: string, opts: {}) {
		super();
		this.isLoaded = false;
		this.apiKey = apiKey;
		this.options = opts;
		this.loadConfig();
	}

	onLoadConfig(data: {}) {
		this.isLoaded = true;
		this.config = data;
		this.emit('loaded', data);
	}

	async loadConfig() {
		const data = await fetch(`${API_ENDPOINT}/${this.apiKey}`);
		this.emit('fetching');
		try {
			this.onLoadConfig(data);
		} catch (err) {
			console.error(err);
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
