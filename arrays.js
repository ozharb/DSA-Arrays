'use strict';

let Memory = require('./memory')
     let mem = new Memory()

class Array {


    constructor() {

        this.length = 0;
        this._capacity = 0;
        this.ptr = mem.allocate(this.length);
    }

 
    push(value){
        if(this.length >= this._capacity){
          this._resize((this.length + 1) * Array.SIZE_RATIO) 
        }
        mem.set(this.ptr + this.length, value);
        this.length++;

    }

    pop(){
        if (this.length === 0){
            throw new Error('Index Error')
        };
        const value = mem.get(this.ptr +this.length -1);
        this.length--;
        return value;
    }
    remove(index){
        if(index < 0 || index >= this.length){
            throw new Error('Index Error')
        }
        mem.copy(this.ptr + index, this.ptr + index + 1, this.length-index-1)
    }

    _resize(size) {
        const oldPtr = this.ptr;
        this.ptr = mem.allocate(size)
        if(this.ptr === null){
            throw new Error('Out of Memory');
        }
        mem.copy(this.ptr, oldPtr, this.length);
        mem.free(oldPtr);
        this._capacity = size;
    }
}
Array.SIZE_RATIO = 3

function main(){
    Array.SIZE_RATIO = 3;
   
    let arr = new Array();

    arr.push("T");
 
    console.log(mem.get(arr.ptr));

}
main()


