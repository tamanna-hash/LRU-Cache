# LRU Cache — Algorithm Explanation

An LRU (Least Recently Used) cache evicts the entry that was accessed least recently when the cache is full and a new entry needs to be stored.

## Data Structures

Two structures work together to keep both operations at O(1) average time:

1. **HashMap** — maps each key directly to its list node for O(1) lookup, insert, and delete.
2. **Doubly Linked List** — maintains access order with head and tail sentinels. The node after the head is the most recently used (MRU); the node before the tail is the least recently used (LRU). Each node stores `prev` and `next` pointers, so any node can be unlinked and moved in O(1) without scanning.

## Operations

- **`get(key)`** — Look up the node via the HashMap. If found, move it to the MRU position and return its value. If not found, return -1.
- **`put(key, value)`** — If the key exists, update its value and move the node to MRU. Otherwise insert a new node at MRU and add it to the HashMap. If the cache exceeds capacity, remove the LRU node and delete its key from the HashMap.

Both operations touch a fixed number of pointers and perform one HashMap access, with no iteration, giving O(1) time and O(n) space.
