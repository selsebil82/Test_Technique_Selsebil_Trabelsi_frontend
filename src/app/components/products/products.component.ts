import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Product } from 'src/app/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: any;
  originalProducts: any; // Ajoutez cette propriété pour stocker la liste originale des produits
  product = new Product();
  successMessageId: number | null = null;
  searchQuery: string = ''; // Ajoutez cette propriété pour la requête de recherche

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.getProductData();
  }

  getProductData() {
    console.log('liste des produits');
    this.dataService.getProducts().subscribe((res) => {
      console.log(res);
      this.products = res;
      this.originalProducts = res; // Stocke la liste originale des produits
    });
  }

  insertData() {
    this.dataService.createProduct(this.product).subscribe((res) => {
      this.getProductData();
    });
  }

  deleteData(id: any) {
    if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
      this.dataService.deleteProduct(id).subscribe((res) => {
        this.getProductData();
        this.successMessageId = id;
        setTimeout(() => {
          this.successMessageId = null;
        }, 2000);
      });
    }
  }

  onSearchChange() {
    if (this.searchQuery.trim() !== '') {
      this.products = this.originalProducts.filter((prod: any) => {
        const name = prod.name.toLowerCase();
        const query = this.searchQuery.toLowerCase();
        return name.includes(query);
      });
    } else {
      this.products = this.originalProducts; // Restaure la liste originale des produits
    }
  }
}
