/*
*   INTERSECTION TYPE
*/

type Admin = {
    name: string;
    privileges: string[];
}

type Employee = {
    name: string;
    startDate: Date;
}

type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Max',
    privileges: ["create-server"],
    startDate: new Date()
};

/*
*   TYPE GUARD - used by the compiler to protect against potential mistakes during union or intersection types
*       typeof protects native types
*       in protects custom types
*       instanceof protects classes
*/
type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

type UnknownEmployee = Employee | Admin;

// using IN keyword
function printEmployeeInformation(emp: UnknownEmployee) {
    console.log('Name: ' + emp.name);
    if('privileges' in emp) {
        console.log('Privileges: ' + emp.privileges);
    }
    if('startDate' in emp) {
        console.log('StartDate: ' + emp.startDate);
    }
}

// using INSTANCEOF keyword
class Car {
    drive() {
        console.log('driving inside car...');
    }
}

class Truck {
    drive() {
        console.log('driving inside truck...');
    }

    loadCargo(load: number) {
        console.log('loading cargo: ' + load);
    }
}

type Vehicle = Car | Truck;

const v1 = new Car();
const v2 = new Truck();

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();

    if(vehicle instanceof Truck) {
        vehicle.loadCargo(100);
    }
}

/*
*   DISCRIMINATED UNIONS - ensuring that every object in the union has a type so that we can compare against it
*/

interface Bird {
    type: 'bird',
    flyingSpeed: number;
}

interface Horse {
    type: 'horse'
    runningSpeed: number;
}

type Animal = Bird | Horse;

function moveAnimal(animal: Animal) {
    let speed;
    switch(animal.type) {
        case 'bird':
            speed = animal.flyingSpeed;
            break;
        case 'horse':
            speed = animal.runningSpeed;
            break;
    }
    console.log('Moving at speed: ' + speed);
}

moveAnimal({type: 'bird', flyingSpeed: 100});


/*
*   TYPE CASTING
*/

// const userInputElement = <HTMLInputElement>document.getElementById('my-input');
const userInputElement = document.getElementById('my-input') as HTMLInputElement;

userInputElement.value = "hello, how are you";

/*
*   INDEX TYPES
*/
interface ErrorContainer {
    // [prop: string] basically states that we don't know how many properties there will be, and what names they will have, we only know that they are of type string
    [prop: string]: string;
}

const errorBag: ErrorContainer = {
    email: 'Not a valid email!',
    username: 'Must start with a capital character!',
}

/*
*   FUNCTION OVERLOAD - a function with the same name but takes different number of parameters and/or have different return types
*/
function add_overloaded(a: number, b: number) : number;
function add_overloaded(a: string, b: string) : string;
function add_overloaded(a: number, b: string) : string;
function add_overloaded(a: string, b: number) : string;
function add_overloaded(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }
    return a + b;
}

const result = add_overloaded('Max ', 'Brenner');
result.split(' ');

/*
*   OPTIONAL CHAINING - this is useful when accessing objects with very deep nests that we are unaware if the value will exist
*/
const fetchedUserData = {
    id: 'u1',
    name: 'max',
    job: { title: 'CEO', description: 'my very own company' }
}

console.log(fetchedUserData && fetchedUserData.job.title); // standard javascript way of ensuring that a variable is not null before accessing it to avoid runtime errors
console.log(fetchedUserData?.job?.title); // in typescript, we just add question marks to variables we are unsure if exists

/*
*   NULLISH COALESCING - ?? - if it's not null or undefined, then we will use the fallback value
*/
const userInput = '';
const storedData = userInput ?? 'DEFAULT';
console.log(storedData);
