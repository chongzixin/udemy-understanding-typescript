/* 
    USING pre-existing libraries
*/

// import _ from 'lodash';
// console.log(_.shuffle([1,2,3]));

/*
    USING CLASS-TRANSFORMER
*/
import { Product } from './product.model';

const p1 = new Product('A book', 12.99);
console.log(p1.getInformation());

// class-transformer is a library that makes an array of fields into a class

