import { LRUCache } from "./LRUCache";

// ── Basic contract ─────────────────────────────────────────────────────────

describe("LRUCache — basic contract", () => {
  test("returns -1 for a missing key", () => {
    const cache = new LRUCache(2);
    expect(cache.get(1)).toBe(-1);
  });

  test("stores and retrieves a single entry", () => {
    const cache = new LRUCache(1);
    cache.put(1, 10);
    expect(cache.get(1)).toBe(10);
  });

  test("updates value for an existing key", () => {
    const cache = new LRUCache(2);
    cache.put(1, 10);
    cache.put(1, 99);
    expect(cache.get(1)).toBe(99);
    expect(cache.size).toBe(1);
  });
});

// ── Eviction ───────────────────────────────────────────────────────────────

describe("LRUCache — eviction", () => {
  test("evicts the least recently used entry when over capacity", () => {
    const cache = new LRUCache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    cache.put(3, 3); // key 1 should be evicted
    expect(cache.get(1)).toBe(-1);
    expect(cache.get(2)).toBe(2);
    expect(cache.get(3)).toBe(3);
  });

  test("a get refreshes recency, protecting the key from eviction", () => {
    const cache = new LRUCache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    cache.get(1);   // key 1 is now MRU; key 2 becomes LRU
    cache.put(3, 3); // key 2 should be evicted
    expect(cache.get(1)).toBe(1);
    expect(cache.get(2)).toBe(-1);
    expect(cache.get(3)).toBe(3);
  });

  test("a put on an existing key refreshes recency", () => {
    const cache = new LRUCache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    cache.put(1, 100); // refresh key 1 — key 2 is now LRU
    cache.put(3, 3);   // key 2 should be evicted
    expect(cache.get(2)).toBe(-1);
    expect(cache.get(1)).toBe(100);
    expect(cache.get(3)).toBe(3);
  });
});

// ── Size tracking ──────────────────────────────────────────────────────────

describe("LRUCache — size", () => {
  test("size grows with unique insertions", () => {
    const cache = new LRUCache(3);
    expect(cache.size).toBe(0);
    cache.put(1, 1);
    expect(cache.size).toBe(1);
    cache.put(2, 2);
    expect(cache.size).toBe(2);
  });

  test("size does not exceed capacity", () => {
    const cache = new LRUCache(2);
    cache.put(1, 1);
    cache.put(2, 2);
    cache.put(3, 3);
    expect(cache.size).toBe(2);
  });

  test("updating an existing key does not increase size", () => {
    const cache = new LRUCache(3);
    cache.put(1, 1);
    cache.put(1, 2);
    expect(cache.size).toBe(1);
  });
});

// ── LeetCode example ───────────────────────────────────────────────────────

describe("LRUCache — LeetCode example (capacity = 2)", () => {
  test("matches expected output", () => {
    const cache = new LRUCache(2);
    cache.put(1, 1);          // cache: {1=1}
    cache.put(2, 2);          // cache: {1=1, 2=2}
    expect(cache.get(1)).toBe(1);  // return 1; cache: {2=2, 1=1}
    cache.put(3, 3);          // evicts key 2; cache: {1=1, 3=3}
    expect(cache.get(2)).toBe(-1); // not found
    cache.put(4, 4);          // evicts key 1; cache: {3=3, 4=4}
    expect(cache.get(1)).toBe(-1); // not found
    expect(cache.get(3)).toBe(3);  // return 3
    expect(cache.get(4)).toBe(4);  // return 4
  });
});

// ── Edge cases ─────────────────────────────────────────────────────────────

describe("LRUCache — edge cases", () => {
  test("capacity of 1 always keeps only the latest entry", () => {
    const cache = new LRUCache(1);
    cache.put(1, 1);
    cache.put(2, 2);
    expect(cache.get(1)).toBe(-1);
    expect(cache.get(2)).toBe(2);
  });

  test("throws RangeError for capacity < 1", () => {
    expect(() => new LRUCache(0)).toThrow(RangeError);
  });

  test("handles large sequence without losing integrity", () => {
    const cache = new LRUCache(100);
    for (let i = 0; i < 200; i++) cache.put(i, i * 10);
    expect(cache.size).toBe(100);
    // keys 0–99 should be evicted; 100–199 should be present
    for (let i = 0; i < 100; i++) expect(cache.get(i)).toBe(-1);
    for (let i = 100; i < 200; i++) expect(cache.get(i)).toBe(i * 10);
  });
});
