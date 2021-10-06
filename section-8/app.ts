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
    return function<T extends {new(...args: any[]): {name: string}}>(originalConstructor: T) {
        return class extends originalConstructor {
            constructor(..._: any[]) {
                super();
                console.log('Rendering template');
                const hookEl = document.getElementById(hookId);
                if (hookEl) {
                    hookEl.innerHTML = template;
                    hookEl.querySelector('h1')!.textContent = this.name;
                }
            }
        }
    }
}

@Logger('LOGGING - PERSON')
@WithTemplate('<h1>Hello</h1>', 'app')
class Person {
    name = 'Max';

    constructor() {
        console.log('inside the constructor');
    }
}

const pers = new Person();
console.log(pers);

function LogProperty(target: any, propertyName: string) {
    console.log('Property decorator!');
    console.log(target, propertyName);
} 

function LogAccessor(target: any, name: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    console.log('Accessor decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
    return { 
        // can set the getter method, or configurable here if we want to.
    };
}

function LogMethod(target: any, name: string | Symbol, descriptor: PropertyDescriptor): PropertyDescriptor {
    console.log('Method decorator!');
    console.log(target);
    console.log(name);
    console.log(descriptor);
    return {

    };
}

function LogParameter(target: any, name: string | Symbol, position: number) {
    console.log('Parameter decorator!');
    console.log(target);
    console.log(name);
    console.log(position);
}

class Product {
    @LogProperty
    title: string;
    private _price: number;

    @LogAccessor
    set price(val: number) {
        if (val > 0) {
            this._price = val;
        } else {
            throw new Error('Invalid price - should be positive!');
        }
    }

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    @LogMethod
    getPriceWithTax(@LogParameter tax: number) {
        return this._price * (1 + tax);
    }
}

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };
    return adjDescriptor;
}

class Printer {
    message = 'This works!';

    @Autobind
    showMessage() {
        console.log(this.message);
    }
}

const p = new Printer();

const button = document.querySelector('button')!;
// without the Autobind decorator, the below will return undefined because this.message will refer to the button
button.addEventListener('click', p.showMessage);
// without the Autobind decorator, .bind method could help work around this
// button.addEventListener('click', p.showMessage.bind(p));

interface ValidatorConfig {
    [property: string]: {
        [validatableProp: string]: string[] // ['required', 'positive']
    }
}

const registeredValidator: ValidatorConfig = {};

function Required(target: any, propName: string) {
    registeredValidator[target.constructor.name] = {
        ...registeredValidator[target.constructor.name],
        [propName]: [...(registeredValidator[target.constructor.name]?.[propName] ?? []), 'required']
    };
}

function PositiveNumber(target: any, propName: string) {
    registeredValidator[target.constructor.name] = {
        ...registeredValidator[target.constructor.name],
        [propName]: [...(registeredValidator[target.constructor.name]?.[propName] ?? []), 'positive']
    };
}

function validate(obj: any) {
    const objValidatorConfig = registeredValidator[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required':
                    isValid = isValid && !!obj[prop];
                    break;
                case 'positive':
                    isValid = isValid && obj[prop] > 0;
                    break;
            }
        }
    }
    return isValid;
}

class Course {
    @Required
    title: string
    @PositiveNumber
    price: number;

    constructor(t: string, p:number) {
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
    event.preventDefault();
    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    // what if we could use Decorators on the class itself to validate if title and price exist?
    const title = titleEl.value;
    const price = +priceEl.value;

    const createdCourse = new Course(title, price);

    if (!validate(createdCourse)) {
        alert('Invalid input, please try again!');
        return;
    }
    console.log(createdCourse);
});