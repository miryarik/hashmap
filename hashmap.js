class HashMap {
    #table;
    #length;

    constructor(loadFactor, capacity) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.#table = new Array(capacity);
        this.#length = 0;

        // all buckets are linked lists
        for (let i = 0; i < capacity; i++) {
            this.#table[i] = new LinkedList();
        }
    }

    get(key) {
        // returns the value assigned to this key

        // find which bucket the key maps to
        const bucket = this.#table[this.#hash(key)];

        // find where the key is in the bucket
        const idx = bucket.find(key);

        // return the value at that node
        // if there is no such key return null
        if (idx != null) {
            return bucket.at(idx).data.value;
        } else return null;
    }

    remove(key) {
        // find what bucket key maps to
        const bucket = this.#table[this.#hash(key)];

        // find where the key is in the bucket
        const idx = bucket.find(key);
        if (idx != null) {
            // remove the node at that position
            bucket.removeAt(idx);
            this.#length--;
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

        this.#table.forEach(bucket => {

            let current = bucket.head;

            // as long as current node exists
            // add the key of current node to keys
            // move to next node

            while (current != null) {
                keys.push(current.data.key);
                current = current.next;
            }

        }); 

        return keys;

    }

    values() {
        // returns an array containing all the stored values
        
        let values = [];

        this.#table.forEach(bucket => {

            let current = bucket.head;

            // as long as current node exists
            // add the value of current node to values
            // move to next node

            while (current != null) {
                values.push(current.data.value);
                current = current.next;
            }

        }); 

        return values;

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

        // what a headache, should've just used the loop
        this.#length = 0
    }

    get length() {
        // returns the number of stored keys

        // let count = 0;

        // // for each bucket
        // this.#table.forEach(bucket => {
        //     count += bucket.size;
        // })

        // return count;

        // use a getter for length instead
        // and now we need a setter as well
        return this.#length;
    }

    set length(val) {
        console.error("Cannot access private field 'length'");
    }

    set(key, value) {
        // find corresponding bucket
        const bucket = this.#table[this.#hash(key)];

        // if key already exists in bucket
        const idx = bucket.find(key);
        if (idx !== null) {
            // then overwrite its value
            bucket.at(idx).data = { key, value };
        } else {
            // if not then put the key-value in bucket
            bucket.append({ key, value });
        }

        this.#length++;
    }

    print() {
        console.log(this.#table);
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
            hashCode = hashCode % this.capacity;
        }

        return hashCode;
    }
}
