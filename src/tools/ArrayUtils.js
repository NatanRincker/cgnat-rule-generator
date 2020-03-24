export default class ArrayUtils{
    static invert(arr){
        let invertedArr=[]
        for(let i = arr.length-1; i>=0; i--){
            invertedArr.push(arr[i]);
        }
        return invertedArr
    }
}