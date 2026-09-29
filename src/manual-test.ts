import { LRUCache } from "./LRUCache";

const cache = new LRUCache(2);

cache.put(1, 10);
cache.put(2, 20);

console.log(cache.get(1)); // Expected: 10

cache.put(3, 30); // Should evict key 2 (LRU)

console.log(cache.get(2)); // Expected: -1
console.log(cache.get(3)); // Expected: 30
console.log(cache.get(1)); // Expected: 10
