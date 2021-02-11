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

    arr.push(7);
 
    console.log(mem.get(arr.ptr));

}

// URLify a string

function URLify(str){
    str = [...str]
    for(let i = 0; i < str.length-1; i++){
        if (str[i]===' '){
            str[i]='%20'
        }
    }
    return str.join('')
}

// Filtering an array
 
function lessThanFiveOnly(arr){
let result = []
    for(let i = 0; i<arr.length;i++){
        if(arr[i]<5){
        result.push(arr[i])
        }
    }
    return result
}

//7. Max sum in the array

function sum(arr){
    return arr.reduce((sum,num)=>{
       return sum+=num
     }, 0)
   }
   
   function maxSum(arr){
   if (arr.length==2){
     sum(arr)
   } 
   else {
   let highestSum = 0
   let highestSeq
   for(let i = 0; i < arr.length; i++){
   let oneArr = arr.slice(0,i+1)
   if (sum(oneArr) > highestSum){
     highestSum = sum(oneArr)
     highestSeq = oneArr
   }
   }
   return {highSum : highestSum,
           highSeq: highestSeq}
   }
   }
//    8. Merge arrays

   function mergeNsort(arr1,arr2){
    return arr1.concat(arr2).sort((a,b)=>a-b)
    }

    function mergeSorted(a,b){
        a = [...a]
        
        for(let i = 0; i < b.length; i ++){
          for(let j = 0; j< a.length; j++){
            if(a[j]>b[i]){
             a.splice(j,0,b[i])
            break
            }
          }
        }
        return a
        }
        
