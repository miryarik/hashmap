import LinkedList from "./linkedList-1.js";

class HashSet {
    #table;
    #capacity;

    constructor(loadFactor, capacity = 16) {
        this.loadFactor = loadFactor;
        this.#capacity = capacity;
        this.#table = new Array(this.#capacity);

        // all buckets are linked lists
        for (let i = 0; i < this.#capacity; i++) {
            this.#table[i] = new LinkedList();
        }
    }

    grow() {
        const entries = this.entries();

        // make a new map
        // with the table of double #capacity
        this.#capacity = this.#capacity * 2;
        this.#table = new Array(this.#capacity);
        // all buckets are linked lists
        for (let i = 0; i < this.#capacity; i++) {
            this.#table[i] = new LinkedList();
        }

        // then take all the current entries and
        // set them into in
        entries.forEach(entry => {
            this.set(entry);
        });
    }

    entries() {
        // returns an array containing all the stored key-value pairs

        let entries = [];

        this.#table.forEach((bucket) => {
            let current = bucket.head;

            // as long as current node exists
            // add the [key, value] of current node to entries
            // move to next node

            while (current != null) {
                entries.push(current.data);
                current = current.next;
            }
        });

        return entries;
    }

    remove(key) {
        // find what bucket key maps to
        const bucket = this.#table[this.#hash(key)];

        // find where the key is in the bucket
        const idx = bucket.find(key);
        if (idx != null) {
            // remove the node at that position
            bucket.removeAt(idx);
            // return true
            return true;
        } else {
            // if there is no such node return false
            return false;
        }
    }

    keys() {
        // returns an array containing all the stored keys

        let keys = [];

        this.#table.forEach((bucket) => {
            let current = bucket.head;

            // as long as current node exists
            // add the key of current node to keys
            // move to next node

            while (current != null) {
                keys.push(current.data);
                current = current.next;
            }
        });

        return keys;
    }

    has(key) {
        // find what bucket the key maps to
        const bucket = this.#table[this.#hash(key)];

        // see if the bucket has the key
        const idx = bucket.find(key);

        if (idx != null) return true;
        else return false;
    }

    clear() {
        // remove all entries from the map
        // make heads of all buckets point to null
        this.#table.forEach((bucket) => {
            bucket.head = null;
        });
    }

    length() {
        // returns the number of stored keys

        let count = 0;

        // for each bucket
        this.#table.forEach((bucket) => {
            count += bucket.size;
        });

        return count;

        // use a getter for length instead
        // and now we need a setter as well
        // return this.#length;
    }

    set(key) {
        // find corresponding bucket
        const bucket = this.#table[this.#hash(key)];

        // if key already exists in bucket
        const idx = bucket.find(key);
        if (idx !== null) {
            // then overwrite its value
            bucket.at(idx).data = key;
        } else {
            // if not then put the key-value in bucket
            bucket.append(key);
        }

        // if load factor has been crossed
        // then grow hashtable
        if (this.length() > this.loadFactor * this.#capacity) this.grow();
    }

    get capacity() {
        return this.#capacity;
    }

    #hash(key) {
        // basic input type check
        if (typeof key != "string")
            throw Error("Only string types are supported");

        let hashCode = 0;

        // basic hash function
        const primeNumber = 31;
        for (let i = 0; i < key.length; i++) {
            hashCode = primeNumber * hashCode + key.charCodeAt(i);

            // keep it within table length
            hashCode = hashCode % this.#capacity;
        }

        return hashCode;



        // let hash = 31;
        // for (let i = 0; i < key.length; i++) {
        //     // XOR for better distribution
        //     hash = (hash * 31) ^ key.charCodeAt(i); 
        // }
        // // Convert to unsigned 32-bit integer
        // return ((hash >>> 3) % this.#capacity);
    }
}