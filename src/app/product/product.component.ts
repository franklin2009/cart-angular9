import { Component, OnInit } from '@angular/core';
import { ProductService } from '../services/products';
import { CartService } from '../services/carts';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
 
  isCart: boolean = false;
  cart: number = 0;
  products: any = [];

  constructor(private productHttp: ProductService, private cartHttp: CartService) { }

  ngOnInit(): void {
	  this.load();
  }
  
  addCart(product) {
	let data={'product': product.id };
	product.disabled=true;
	this.isCart=false;
	this.cartHttp.add(data).subscribe((isAdd: number) => {
		  if(isAdd){
			  this.cart += 1;
			  this.isCart=true;
		  }
		  product.disabled=false;
	});
  }
  
  load(){
	  this.cartHttp.total().subscribe((total: number) => {
		  this.cart=total;
	  });
	  this.productHttp.all().subscribe((data: any) => {
		  this.products=data;
	  });
  }

}
