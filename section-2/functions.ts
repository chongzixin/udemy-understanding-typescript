// setting return type of functions

function add(n1: number, n2: number): number {
    return n1 + n2;
}

function printResult(num: number): void {
    console.log("Result: " + num);
}

// setting function as a return
// the first method will work, but is useless because it just says we expect a function
let combineFunction: Function;
// this is more useful because we can specify what parameters and return type a function should expect
let combineFunctions: (a: number, b: number) =>  number;

// using the above example, we specify what a callback function should look like
function addAndHandle(n1: number, n2: number, callback: (num: number) => void) {
    const result = n1 + n2;
    callback(result);
}
// call the callback function
addAndHandle(20, 30, (result) => {
    console.log(result);
    return result; // this is not caught even though it was specified void above
});