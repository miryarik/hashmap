class LinkedList {
    constructor() {
        // linked list is recognised by a head
        // size is for utility
        this.head = null;
    }

    removeAt(index) {
        // remove node at given index

        // if list is empty, return
        if (this.head === null) return;

        // if index is zero, remove using head
        if (index === 0) {
            // put head -> first.next
            // first.next -> null
            let first = this.head;
            this.head = first.next;
            first.next = null;

            return;
        }

        // traverse to index - 1 (prev)
        let prev = this.head;
        for (let i = 0; i < index - 1; i++) {
            prev = prev.next;
        }
        // prev point to current.next
        // current point to null
        let current = prev.next;
        prev.next = current.next;
        current.next = null;
    }

    insertAt(data, index) {
        // insert node with data at index

        // create node
        const newNode = new Node(data);

        // if list is empty and index is not 0, return
        if (this.head === null && index != 0) return;

        // if list is empty but index is 0
        // assign first node
        if (this.head === null) {
            this.head = newNode;
            return;
        }

        // if index is 0 and list is non empty
        // prepend / insert at start
        if (index === 0) {
            this.prepend(data)
            return
        }
        
        // else traverse to 1 before index
        let prev = this.head;
        for(let i = 0; i < (index - 1); i++) {
            prev = prev.next;
        }

        // make node.next -> index
        // and prev.next -> node
        newNode.next = prev.next;
        prev.next = newNode;

    }

    toString() {
        // return li as formatted string
        // ( data ) -> ( data ) -> null
        
        let listString = "";
        let current = this.head;

        // traverse all nodes until null
        while(current != null) {
            // for each node append `( data ) ->` to string
            listString += `( ${current.data} ) -> `;
            current = current.next;
        }
        
        // finally add a `null`
        listString += "null";
        
        return listString;
    }

    contains(data) {
        // return true if data is in list

        // if list is empty return
        if (this.head === null) return;

        // else traverse entire list until the data is seen
        // or end is reached
        let current = this.head;
        while (current.data != data && current.next != null) {
            current = current.next;
        }
        
        // return true if it is seen, false ow
        if (current.data == data) return true;
        else return false;
    }

    find(key) {
        // return index of node with given key

        // if list is empty return
        if (this.head === null) return null;

        // else traverse entire list until the key is seen
        // or end is reached
        let current = this.head;
        let idx = 0;
        while (current.data != key && current.next != null) {
            current = current.next;
            idx++;
        }
        
        // return true if it is seen, false ow
        if (current.data == key) return idx;
        else return null;
    }

    pop() {
        // remove the last element from the list
        // if list is empty return
        if (this.head === null) return;

        
        // else traverse with two pointers
        let first = this.head;
        let second = first.next;
        
        // until second reaches null
        while (second.next != null) {
            second = second.next;
            first = first.next;
        }
        // remove the first.next there
        first.next = null;
    }

    at(index) {
        // return node at given index

        // if list is empty return null
        if (index < 0 || this.head === null) return null;

        // else traverse to given index and return current node
        let current = this.head;
        for(let i = 0; i < index; i++) {
            current = current.next;
        }

        return current;
    }

    get size() {
        
        // if list is empty return 0
        if (this.head === null) return 0;

        let size = 1;
        let i = this.head;
        while (i.next != null) {
            // else iterate the list until null is reached
            // increment count in each itereation
            size++;
            i = i.next;
        }

        return size;
    }

    get tail() {
        // if list is empty return head
        if (this.head === null) return this.head;

        // else traverse node.next until null is reached
        let i = this.head;
        while(i.next != null) {
            i = i.next;
        }

        return i;

    }

    append(data) {
        // attach new node with data to end of list

        // create a new node with the data
        const endNode = new Node(data);

        // if list if empty, attach to head
        if (this.head === null) this.head = endNode;
        else {
            // traverse to node.next from head until null is reached
            let i = this.head;
            while (i.next != null) {
                i = i.next;
            }

            // put the new node here
            i.next = endNode;
        }

    }

    prepend(data) {
        // attach new node with data to start of list

        // create a new node with data
        const startNode = new Node(data);

        // put node.next -> head
        // put head -> node
        startNode.next = this.head;
        this.head = startNode;

    }
}

class Node {
    constructor(data = null, next = null) {
        this.data = data;
        this.next = next;
    }
}


