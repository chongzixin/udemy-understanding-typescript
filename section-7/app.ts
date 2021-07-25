/*
* GENERICS
*/

const names: Array<string> = [];

const promise: Promise<string> = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('This is done!');
    }, 2000);
});

promise.then(data => {
    data.split(' ');
})

/*
* OUR OWN GENERIC FUNCTION
*/

// the angle brackets tells TypeScript it should expect generic objects T, U
// extends will force the generic object to be of a certain type (e.g. number)
function merge<T extends Object, U extends number>(objA: T, objB: U) {
    return Object.assign(objA, objB);
}

const mergedObj = merge({name: 'Max'}, 30);
console.log(mergedObj.name);

interface Lengthy {
    length: number
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let descriptionText = 'Got no value.';

    if (element.length > 0)
        descriptionText = 'Got ' + element.length + ' elements';
    return [element, descriptionText];
}

console.log(countAndDescribe(['Hello how are you.', 'Max the glow train']));


function extractAndConvert<T extends object, U extends keyof T>(
    obj: T, 
    key: U
) {
    return obj[key];
}

console.log(extractAndConvert({name: 'Max'}, 'name'));


/*
* GENERIC CLASSES
*/
class DataStorage<T extends string | number | boolean> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Max');
textStorage.addItem('The Glow Train');
console.log(textStorage.getItems());

const numStorage = new DataStorage<number | string>();
numStorage.addItem(1);
numStorage.addItem('Max the Glow Train 2');
numStorage.addItem(3);
console.log(numStorage);

/*
* GENERIC UTILITY TYPES
*/

interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

// PARTIAL tells typescript at declaration that it should expect CourseGoal to be incomplete along the way
function createCourseGoal(title: string, description: string, date: Date) {
    let courseGoal: Partial<CourseGoal> = {};
    courseGoal.title = title;
    courseGoal.description = description;
    courseGoal.completeUntil = date;
    return courseGoal;
}

// makes it stricter by specifying readonly
const names_readonly: Readonly<string[]> = ['Max', 'The Glow Train'];
// names_readonly.push('Titounis');

