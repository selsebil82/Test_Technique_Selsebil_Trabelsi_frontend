import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/service/data.service';
import { Product } from 'src/app/product';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
products:any;
product=new Product; 
successMessageId: number | null = null;

  constructor(private dataService:DataService) { }

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

insertData(){
  this.dataService.createProduct(this.product).subscribe(res =>{
    this.getProductData(); 
  })
}
deleteData(id: any) {
  if (confirm('Voulez-vous vraiment supprimer ce produit ?')) {
    this.dataService.deleteProduct(id).subscribe(
      res => {
        this.getProductData();
        this.successMessageId = id; // Stocke l'ID du produit supprimé
        setTimeout(() => {
          this.successMessageId = null; // Réinitialise la propriété après un délai de 2 secondes (facultatif)
        }, 2000);
      }
    );
  }
}



}