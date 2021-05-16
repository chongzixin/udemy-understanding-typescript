/*
    unknown type
*/

let userInput: unknown;
let username: string;

// unknown is different from any
if(typeof userInput === 'string') {
    username = userInput;
}

/*
    never type - use when we are sure that we will never return anything. not even undefined
*/
function generateError(message: string, code: number): never {
    throw {message: message, errorCode: code};
}