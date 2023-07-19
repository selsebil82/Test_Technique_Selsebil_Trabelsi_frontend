import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';


import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule } from '@angular/forms';
import { ProductUpdateComponent } from './components/product-update/product-update.component';
import { ProductShowComponent } from './components/product-show/product-show.component';
import { ProductAddComponent } from './components/product-add/product-add.component';
import { ProductSearchComponent } from './components/product-search/product-search.component';
import { FooterComponent } from './components/footer/footer.component';


const appRoutes: Routes = [
  {
    path:'', component:ProductsComponent
  },
  {
    path:'update/:id', component:ProductUpdateComponent
  },
  {
    path:'show/:id', component:ProductShowComponent
  },

  {
    path:'add', component:ProductAddComponent
  },

  {
    path:'search', component:ProductSearchComponent
  }


]


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    NavbarComponent,
    ProductUpdateComponent,
    ProductShowComponent,
    ProductAddComponent,
    ProductSearchComponent,
    FooterComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }