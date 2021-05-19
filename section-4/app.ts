console.log("Here");

/*
    arrow functions
*/

const add = (a: number, b: number) => a + b;

const printOutput: (a: number | string) => void = output => console.log(output);

const button = document.querySelector('button');
button?.addEventListener('click', event => console.log(event));

// default arguments in a function
// default arguments must always be the last parameter
const add2 = (a: number, b: number=2) => a + b;

/* 
    spread operator
*/

// arrays
const hobbies = ['eat', 'sleep'];
const activeHobbies = ['code'];
activeHobbies.push(...hobbies);
console.log(activeHobbies);

// objects
const person = {
    name: 'zixin',
    age: 30,
};
// this makes an exact copy
const copiedPerson = {...person};


/* 
    rest operator
*/

// tells typescript that everything that comes in will be put into a numbers array
const addRest = (...numbers: number[]) => {
    // then use reduce to add all of them up
    return numbers.reduce((currResult, nextResult) => currResult + nextResult, 0);
};
const addedNumbers = addRest(1,4,5,6,1,5,6,77);
console.log(addedNumbers);

/*
    array destructuring
*/
const [hobby1, hobby2, ...remainingHobbies] = hobbies;

/*
    object destructuring
*/
const { name: des_name, age: des_age } = person;
console.log(des_age);
console.log(des_name);