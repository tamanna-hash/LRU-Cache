# vecosoft-lru-cache

A TypeScript implementation of an LRU (Least Recently Used) cache with **O(1) average** `get` and `put` operations, backed by a HashMap + Doubly Linked List.

---

## Project Structure

```
lru-cache/
├── src/
│   ├── LRUCache.ts          # Cache implementation
│   └── LRUCache.test.ts     # Automated tests
├── ALGORITHM.md             # Algorithm explanation (Task 3)
├── package.json
└── tsconfig.json
```

---

## Algorithm

See [`ALGORITHM.md`](./ALGORITHM.md) for the full explanation.

**Core idea:** The HashMap gives O(1) key lookup; the Doubly Linked List maintains access order so the LRU entry can be evicted in O(1). Together they satisfy the O(1) constraint for both operations.

---

## Time & Space Complexity

| Operation | Time | Space |
|-----------|------|-------|
| `get`     | O(1) | —     |
| `put`     | O(1) | —     |
| Overall   | —    | O(n)  |

---

## Usage

```typescript
import { LRUCache } from "./src/LRUCache";

const cache = new LRUCache(2);

cache.put(1, 1);   // cache: {1=1}
cache.put(2, 2);   // cache: {1=1, 2=2}
cache.get(1);      // returns 1  — key 1 is now MRU
cache.put(3, 3);   // evicts key 2 (LRU); cache: {1=1, 3=3}
cache.get(2);      // returns -1 — key 2 was evicted
cache.put(4, 4);   // evicts key 1; cache: {3=3, 4=4}
cache.get(1);      // returns -1
cache.get(3);      // returns 3
cache.get(4);      // returns 4
```

---

## Getting Started

**Prerequisites:** Node.js 18+ and npm.

```bash
# Install dependencies
npm install

# Run tests (single pass)
npm test

# Build to dist/
npm run build
```

---

## Running Tests

Tests are written with [Jest](https://jestjs.io/) via `ts-jest` (no compilation step needed).

```bash
npm test
```

Test coverage includes:
- Basic get/put contract
- Eviction order (LRU is always evicted first)
- Recency refresh via `get` and `put`
- Size tracking
- LeetCode canonical example (capacity = 2)
- Edge cases: capacity of 1, invalid capacity, large sequences
