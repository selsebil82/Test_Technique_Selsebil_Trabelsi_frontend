import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/product';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  products:any;
  product=new Product; 
  successMessage: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) { }
  
    ngOnInit(): void {
      this.getProductData();
    }
    getProductData(){
      console.log('liste des produits');
      this.dataService.getProducts().subscribe(res =>{
        console.log(res);
        this.products = res;
      })
  }
  
  insertData() {
    // Vérifier si les données sont valides avant de les ajouter
    if (!this.isValidData()) {
      this.successMessage = 'Veuillez remplir tous les champs correctement.';
      return;
    }
  
    this.dataService.createProduct(this.product).subscribe(res => {
      this.getProductData();
      this.successMessage = 'Produit ajouté avec succès!';
      setTimeout(() => {
        this.router.navigateByUrl('/');
      }, 700); // Redirige vers la page principale après 0.7 seconde
    });
  }
  
  // Vérifier si les données sont valides
  isValidData(): boolean {
    return (
      this.product.name &&
      this.product.price &&
      this.product.quantity &&
      !isNaN(Number(this.product.price)) &&
      !isNaN(Number(this.product.quantity))
    );
  }
  
  
  }