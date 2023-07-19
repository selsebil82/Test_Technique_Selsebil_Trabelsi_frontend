import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/product';
import { DataService } from 'src/app/service/data.service';

@Component({
  selector: 'app-product-update',
  templateUrl: './product-update.component.html',
  styleUrls: ['./product-update.component.css']
})
export class ProductUpdateComponent implements OnInit {
  id: any;
  data: any;
  product = new Product();
  successMessage: string = '';

  constructor(private route: ActivatedRoute, private router: Router, private dataService: DataService) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.getData();
  }

  getData() {
    this.dataService.getProductById(this.id).subscribe(
      res => {
        this.data = res;
        this.product = this.data;
      }
    );
  }

  updateProduct() {
    // Vérifier si les données sont valides avant de les mettre à jour
    if (!this.isValidData()) {
      this.successMessage = 'Veuillez remplir tous les champs correctement.';
      return;
    }
  
    this.dataService.updateProduct(this.id, this.product).subscribe(
      res => {
        this.successMessage = 'Produit modifié avec succès!';
        setTimeout(() => {
          this.router.navigateByUrl('/');
        }, 700); // Redirige vers la page principale après 0.7 seconde
      }
    );
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
