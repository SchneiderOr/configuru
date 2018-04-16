import NodeCache from 'node-cache';

const cache = new NodeCache();

cache.getAsync = async name => cache.get(name);

export default cache;
