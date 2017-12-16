import { type, prop, pathOr, propOr, merge } from 'ramda';
import fetch from '../lib/utils/fetch';
import cache from '../lib/utils/cache';
const EventEmitter = require('events');
const API_ENDPOINT = 'http://localhost:3000';

export default class Configuru extends EventEmitter {
	constructor(apiKey, opts) {
		super();
		this.isLoaded = false;
		this.apiKey = apiKey;
		this.options = opts;
		this.loadFromServer();
	}

	onLoadConfig(data) {
		this.isLoaded = true;
		this.config = data;
		this.emit('loaded', data);
	}

	async loadFromServer() {
		this.emit('fetching', `${API_ENDPOINT}/${this.apiKey}`);
		const data = await fetch(`${API_ENDPOINT}/${this.apiKey}`);
		try {
			this.onLoadConfig(data);
		} catch (err) {
			console.error(err);
			this.emit('error', err);
			process.exit(1);
		}
	}

	get(key: string | string[], defaultValue: any): {} {

		if (!key) return this.config;
		return type(key) === 'Array'
			? pathOr(defaultValue, key, this.config)
			: propOr(defaultValue, key, this.config);
	}
}
