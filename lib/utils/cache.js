import nodeCache from 'node-cache';
let cache = new nodeCache();

cache.getAsync = async name => await cache.get(name);

export default cache;
