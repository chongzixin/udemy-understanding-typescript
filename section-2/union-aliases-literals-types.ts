/*
 *  UNION TYPES, LITERAL TYPES, ALIAS TYPES
 * 
 */

type Combinable = number | string;
type ConversionDescriptor = 'as-number' | 'as-text';

function combine(
    input1: Combinable, 
    input2: Combinable, 
    resultConversion: ConversionDescriptor
) {
    let result;
    if(typeof input1 === 'number' && typeof input2 === 'number' || resultConversion == 'as-number') {
        // add + in front to make it a number
        result = +input1 + +input2;
    } else {
        result = input1.toString() + input2.toString();
    }
    return result;
}

const combinedAges = combine(20, 30, 'as-number');
console.log(combinedAges);

const combinedNames = combine('jack', 'jill', 'as-text');


/*
* simplifying with alias type
*/

// BEFORE
function greet(user: {name: string; age: number}) {
    console.log('Hi, I am ' + user.name);
}

function isOlder(user: {name: string; age: number}, checkAge: number) {
    return checkAge > user.age;
}

// AFTER
type User = {name: string; age: number};

function alias_greet(user:User) {
    console.log('Hi, I am ' + user.name);
}

function alias_isOlder(user:User, checkAge: number) {
    return checkAge > user.age;
}