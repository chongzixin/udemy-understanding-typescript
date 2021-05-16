function core_add(n1: number, n2: number, print: boolean) {
    if(print) {
        console.log(n1 + n2);
    }
    return n1 + n2;
}

const number1 = 5;
// can also declare a type for a variable, e.g. 
// let number1: number;
const number2 = 2.5;
const printResult = true;
const result = core_add(number1, number2, printResult);


/**
 * declaring object
 */

// we first declare properties and type of the object, then create values for it
// const person: {
//     name: string,
//     age: number,
// } = {
//     name: 'zixin',
//     age: 25,
// };

// but it's in fact simpler to leave the type out, so just use the below
const person = {
    name: 'zixin',
    age: 25,
    hobbies: ['Sports', 'Cooking'],
}

console.log(person.name);

// the same can be done for nested objects
let employee: {
    name: string,
    age: number,
    details: {
        title: string,
        description: string,
    }
};

// if we wanted to specify an array of anything
let array_anything : any[];

/**
 * Tuple - forces the type of variables in an array (e.g. first object must be string, second object must be number)
 * role: [number, string]
 */
const person_with_tuple: {
    name: string;
    age: number;
    hobbies: string[];
    role: [number, string];
} = {
    name: 'zixin',
    age: 25,
    hobbies: ['running', 'eating'],
    role: [2, 'author'],
};

/**
 * Enum
 */
enum Role { ADMIN, READ_ONLY, AUTHOR };
const person_with_enum: {
    name: string;
    age: number;
    hobbies: string[];
    role: Role
} = {
    name: 'zixin',
    age: 25,
    hobbies: ['running', 'eating'],
    role: Role.ADMIN,
};