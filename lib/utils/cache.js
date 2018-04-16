// The library should save (cache) the configuration for future launches in order to reduce the init time.
import NodeCache from 'node-cache';
const cache = new NodeCache();

cache.getAsync = async name => cache.get(name);

export default cache;
