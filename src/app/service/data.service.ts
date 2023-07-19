import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from '../product';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  constructor(private httpClient: HttpClient) { }
  getProducts() {
    return this.httpClient.get('http://127.0.0.1:8000/api/products');
  }

  createProduct(product: Product) {
    return this.httpClient.post('http://127.0.0.1:8000/api/products', product);
  }

  deleteProduct(id: any) {
    return this.httpClient.delete('http://127.0.0.1:8000/api/product/' + id);
  }

  getProductById(id: any) {
    return this.httpClient.get('http://127.0.0.1:8000/api/product/' + id);
  }

  updateProduct(id: any, product: Product) {
    return this.httpClient.put('http://127.0.0.1:8000/api/product/' + id, product);
  }
  searchProducts(searchTerm: string) {
    const response = new Promise(resolve => {
      return this.httpClient.get(`http://127.0.0.1:8000/api/products/search?search=${searchTerm}`).subscribe(data => {
        resolve(data);
      }, err => {
        console.log(err);
      });
    });
    return response;
  }
  

}
