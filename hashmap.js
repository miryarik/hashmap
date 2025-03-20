class HashMap {
    #table;

    constructor(loadFactor, capacity) {
        this.loadFactor = loadFactor;
        this.capacity = capacity;
        this.#table = new Array(capacity);

        // all buckets are linked lists
        for(let i = 0; i < capacity; i++) {
            this.#table[i] = new LinkedList();
        }
    }

    set(key, value) {
        // find corresponding bucket
        const bucket = this.#table[this.#hash(key)];

        // if key already exists in bucket
        const idx = bucket.find(key);
        if (idx !== null) {
            // then overwrite its value
            bucket.at(idx).data = {key, value};
        }
        else {
            // if not then put the key-value in bucket
            bucket.append({key, value});
        }

    }

    print() {
        console.log(this.#table);
    }

    #hash(key) {
        // basic input type check
        if (typeof key != "string") throw Error("Only string types are supported");

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

