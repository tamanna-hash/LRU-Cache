# LRU Cache — Algorithm Explanation

An LRU (Least Recently Used) cache evicts the entry that was accessed least recently when the cache is full and a new entry must be inserted.

## Data Structures

Two structures work together to achieve O(1) average time for both `get` and `put`:

1. **HashMap** — maps each key directly to its node, giving O(1) key lookup.  
2. **Doubly Linked List** — maintains access order. The node just after the head sentinel is the most recently used (MRU); the node just before the tail sentinel is the least recently used (LRU). Because each node holds `prev` and `next` pointers, insertion and removal anywhere in the list are O(1).

## Operations

- **`get(key)`** — Look up the node in the HashMap. If found, unlink it from its current position and reinsert it at the MRU end, then return the value. If not found, return -1.  
- **`put(key, value)`** — If the key exists, update its value and move it to the MRU end. Otherwise, create a new node, insert it at the MRU end, and add it to the HashMap. If the map now exceeds capacity, remove the node at the LRU end and delete its key from the HashMap.

Both operations involve a fixed number of pointer updates and a single HashMap access — no iteration — so each runs in O(1) time and the cache uses O(n) space proportional to its capacity.
