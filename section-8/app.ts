/*
*  Method 1 - create a simple Decorator
*
function Logger(constructor: Function) {
    console.log('Logging...');
    console.log(constructor);
}

@Logger
*/

/*
*  Method 2 - use a Decorator Factory
*  This is useful when we want to send additional values into our decorators
*/
function Logger(logString: string) {
    return function(constructor: Function) {
        console.log(logString);
        console.log(constructor);
    }
}

function WithTemplate(template: string, hookId: string) {
    return function(constructor: any) {
        const hookEl = document.getElementById(hookId);
        const p = new constructor();
        if (hookEl) {
            hookEl.innerHTML = template;
            hookEl.querySelector('h1')!.textContent = p.name;
        }
    }
}

// @Logger('LOGGING - PERSON')
@WithTemplate('<h1>Hello</h1>', 'app')
class Person {
    name = 'Max';

    constructor() {
        console.log('inside the constructor');
    }
}

const pers = new Person();
console.log(pers);