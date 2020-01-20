import { Injectable } from '@angular/core';
import { Product } from './product';

@Injectable()
export class ProductService {

   product1: Product;
   product2: Product;

   constructor() {}

   getAllProducts() {
      return this.product1, this.product2;
   }

}
