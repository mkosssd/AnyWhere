import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Product } from 'src/app/shared/cart-data.service';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http:HttpClient) {
  }
  getProducts(){
   return this.http
      .get<Product[]>(
        "http://localhost:3000/products"
      )
  }
}
