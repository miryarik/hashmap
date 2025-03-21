# JavaScript HashMap and HashSet

A lightweight implementation of HashMap and HashSet to understand and illustrate how these data structures work. These implementations use linked lists for collision resolution and dynamically resize when needed using a load-factor.

## Features

- **HashMap**: Stores key-value pairs with string keys
- **HashSet**: Stores unique string values
- **Collision Resolution**: Uses linked lists to handle hash collisions
- **Dynamic Resizing**: Automatically increases capacity when load factor is reached

## Usage

### HashMap

```javascript
import HashMap from './hashmap.js';

// Create a new HashMap with load factor 0.75 and initial capacity 16
const map = new HashMap(0.75, 16);

// Add key-value pairs
map.set('name', 'John');
map.set('age', 30);

// Get values
console.log(map.get('name')); // "John"

// Check if key exists
console.log(map.has('age')); // true

// Remove a key
map.remove('age');

// Get all keys or values
const keys = map.keys();
const values = map.values();

// Get all entries
const entries = map.entries(); // [["name", "John"], ...]

// Get size
console.log(map.length()); // 1

// Clear all entries
map.clear();
```

### HashSet

```javascript
import HashSet from './hashset.js';

// Create a new HashSet with load factor 0.75 and initial capacity 16
const set = new HashSet(0.75, 16);

// Add values
set.set('apple');
set.set('banana');

// Check if value exists
console.log(set.has('apple')); // true

// Remove a value
set.remove('banana');

// Get all values
const values = set.keys();

// Get size
console.log(set.length()); // 1

// Clear all values
set.clear();
```

## Implementation Details

- Uses a simple hash function with a prime multiplier
- Supports dynamic growth when load factor is exceeded
- For simplicity, only supports string keys
- Built on a LinkedList implementation for collision resolution

## File Structure

- `hashmap.js` - HashMap implementation
- `hashset.js` - HashSet implementation
- `LinkedList.js` - LinkedList used by HashMap
- `linkedList-1.js` - LinkedList used by HashSet