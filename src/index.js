import "./styles.css";

class HashMap {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.capacity = initialCapacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(this.capacity);
    this.size = 0; // Tracks number of stored keys
  }

  // Your updated hash function
  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  set(key, value) {
    const index = this.hash(key);

    // Out of bounds check required by The Odin Project
    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    // 1. If bucket is empty, initialize it
    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    // 2. Check if key already exists (overwrite value)
    const bucket = this.buckets[index];
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket[i][1] = value;
        return; // Exit early since we just updated an existing key
      }
    }

    // 3. Otherwise, it's a new key, so add it
    bucket.push([key, value]);
    this.size++;

    // 4. Check load factor and grow if exceeded
    if (this.size / this.capacity > this.loadFactor) {
      this.grow();
    }
  }

  grow() {
    const oldBuckets = this.buckets;
    this.capacity *= 2; // Double the capacity
    this.buckets = new Array(this.capacity);
    this.size = 0; // Reset size, as set() will re-increment it

    // Rehash all old entries into the new expanded buckets
    oldBuckets.forEach(bucket => {
      if (bucket) {
        bucket.forEach(([key, value]) => {
          this.set(key, value);
        });
      }
    });
    }
    
    get(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const bucket = this.buckets[index];
    if (!bucket) return undefined;

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        return bucket[i][1]; // Return value associated with key
      }
    }

    return undefined;
  }

  has(key) {
    return this.get(key) !== undefined;
  }

  remove(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const bucket = this.buckets[index];
    if (!bucket) return false;

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i][0] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity);
    this.size = 0;
  }

  keys() {
    const allKeys = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        for (let j = 0; j < this.buckets[i].length; j++) {
          allKeys.push(this.buckets[i][j][0]);
        }
      }
    }
    return allKeys;
  }

  values() {
    const allValues = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        for (let j = 0; j < this.buckets[i].length; j++) {
          allValues.push(this.buckets[i][j][1]);
        }
      }
    }
    return allValues;
  }

  entries() {
    const allEntries = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        for (let j = 0; j < this.buckets[i].length; j++) {
          allEntries.push(this.buckets[i][j]);
        }
      }
    }
    return allEntries;
  }
}

const hash = new HashMap()
hash.set('apple', 'red')
hash.set('banana', 'yellow')
hash.set('carrot', 'orange')
hash.set('dog', 'brown')
hash.set('elephant', 'gray')
hash.set('frog', 'green')
hash.set('grape', 'purple')
hash.set('hat', 'black')
hash.set('ice cream', 'white')
hash.set('jacket', 'blue')
hash.set('kite', 'pink')
hash.set('lion', 'golden')

hash.set('lion', 'green')
hash.set('jacket', 'black')
hash.set('moon', 'silver')

console.log(hash.get('apple')) // red
console.log(hash.length()) // 12
console.log(hash.get('lion'))
console.log(hash.entries());
console.log(hash.capacity);



class HashSet {
  constructor(initialCapacity = 16, loadFactor = 0.75) {
    this.capacity = initialCapacity;
    this.loadFactor = loadFactor;
    this.buckets = new Array(this.capacity);
    this.size = 0;
  }

  hash(key) {
    let hashCode = 0;
    const primeNumber = 31;
    for (let i = 0; i < key.length; i++) {
      hashCode = (primeNumber * hashCode + key.charCodeAt(i)) % this.capacity;
    }
    return hashCode;
  }

  set(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    if (!this.buckets[index]) {
      this.buckets[index] = [];
    }

    const bucket = this.buckets[index];
    
    // Check if key already exists (sets only store unique keys, so do nothing if it's already there)
    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i] === key) {
        return; 
      }
    }

    bucket.push(key);
    this.size++;

    if (this.size / this.capacity > this.loadFactor) {
      this.grow();
    }
  }

  has(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const bucket = this.buckets[index];
    if (!bucket) return false;

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i] === key) {
        return true;
      }
    }

    return false;
  }

  remove(key) {
    const index = this.hash(key);

    if (index < 0 || index >= this.buckets.length) {
      throw new Error("Trying to access index out of bounds");
    }

    const bucket = this.buckets[index];
    if (!bucket) return false;

    for (let i = 0; i < bucket.length; i++) {
      if (bucket[i] === key) {
        bucket.splice(i, 1);
        this.size--;
        return true;
      }
    }

    return false;
  }

  length() {
    return this.size;
  }

  clear() {
    this.buckets = new Array(this.capacity);
    this.size = 0;
  }

  keys() {
    const allKeys = [];
    for (let i = 0; i < this.buckets.length; i++) {
      if (this.buckets[i]) {
        for (let j = 0; j < this.buckets[i].length; j++) {
          allKeys.push(this.buckets[i][j]);
        }
      }
    }
    return allKeys;
  }

  grow() {
    const oldBuckets = this.buckets;
    this.capacity *= 2;
    this.buckets = new Array(this.capacity);
    this.size = 0;

    oldBuckets.forEach(bucket => {
      if (bucket) {
        bucket.forEach(key => {
          this.set(key);
        });
      }
    });
  }
}


