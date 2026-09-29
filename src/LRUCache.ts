/**
 * LRU Cache — O(1) average get and put operations.
 *
 * Implementation: Doubly Linked List + HashMap
 *
 * - HashMap maps each key to its list node for O(1) lookup.
 * - Doubly Linked List maintains access order:
 *     head.next = most recently used
 *     tail.prev = least recently used
 * - On get: move accessed node to the front.
 * - On put: insert at front; if capacity exceeded, evict from tail.
 */

interface ListNode {
  key: number;
  value: number;
  prev: ListNode | null;
  next: ListNode | null;
}

function createNode(key: number, value: number): ListNode {
  return { key, value, prev: null, next: null };
}

export class LRUCache {
  private readonly capacity: number;
  private readonly map: Map<number, ListNode>;

  // Sentinel nodes — head is MRU side, tail is LRU side
  private readonly head: ListNode;
  private readonly tail: ListNode;

  constructor(capacity: number) {
    if (capacity < 1) {
      throw new RangeError("LRUCache capacity must be at least 1");
    }
    this.capacity = capacity;
    this.map = new Map();

    // Initialize sentinels and link them
    this.head = createNode(0, 0);
    this.tail = createNode(0, 0);
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  /**
   * Return the value of the key if it exists, otherwise -1.
   * Time: O(1)
   */
  get(key: number): number {
    const node = this.map.get(key);
    if (node === undefined) return -1;
    this.moveToFront(node);
    return node.value;
  }

  /**
   * Insert or update the key-value pair.
   * Evicts the least recently used entry when over capacity.
   * Time: O(1)
   */
  put(key: number, value: number): void {
    const existing = this.map.get(key);
    if (existing !== undefined) {
      existing.value = value;
      this.moveToFront(existing);
      return;
    }

    const node = createNode(key, value);
    this.map.set(key, node);
    this.insertAtFront(node);

    if (this.map.size > this.capacity) {
      this.evictLRU();
    }
  }

  /**
   * Returns the current number of entries in the cache.
   */
  get size(): number {
    return this.map.size;
  }

  // ── Private helpers ──────────────────────────────────────────────────────

  /** Detach a node from its current position in the list. */
  private remove(node: ListNode): void {
    const prev = node.prev!;
    const next = node.next!;
    prev.next = next;
    next.prev = prev;
    node.prev = null;
    node.next = null;
  }

  /** Insert a detached node right after the head sentinel (MRU position). */
  private insertAtFront(node: ListNode): void {
    node.next = this.head.next;
    node.prev = this.head;
    this.head.next!.prev = node;
    this.head.next = node;
  }

  /** Move an existing node to the MRU position. */
  private moveToFront(node: ListNode): void {
    this.remove(node);
    this.insertAtFront(node);
  }

  /** Remove the LRU node (just before the tail sentinel) and delete from map. */
  private evictLRU(): void {
    const lru = this.tail.prev!;
    if (lru === this.head) return; // cache is empty (shouldn't happen)
    this.remove(lru);
    this.map.delete(lru.key);
  }
}
