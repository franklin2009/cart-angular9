import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/carts';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  isChechout: boolean = false;
  isCheck: boolean = false;
  price_total: number = 0;
  products: any = [];
  /*[
	{id:1,sku:'pro0001',name:'Product 1',description:'Product test. Reference 1', price:100, cart:1, quantity:1, price_tot:100},
	{id:2,sku:'pro0002',name:'Product 2',description:'Product test. Reference 2', price:200, cart:1, quantity:2, price_tot:200},
	{id:3,sku:'pro0003',name:'Product 3',description:'Product test. Reference 3', price:300, cart:1, quantity:1, price_tot:300},
	{id:4,sku:'pro0004',name:'Product 4',description:'Product test. Reference 4', price:400, cart:1, quantity:1, price_tot:400}
  ];*/

  constructor(private cartHttp: CartService) { }

  ngOnInit(): void {
	  this.load();
  }
  
  add(product) {
	  product.disabled=true;
	  let data={'product': product.id, 'type':'A'};
	  this.cartHttp.update(data).subscribe((isAdd: number) => {
		  if(isAdd){
			  product.quantity+=1;
			  product.disabled=false;
			  this.calculate(product);
		  }
	  });
  }
  
  remove(product) {
	  product.disabled=true;
	  let data={'product': product.id, 'type':'R'};
	  if(product.quantity > 1){
		  this.cartHttp.update(data).subscribe((isAdd: number) => {
			  if(isAdd){
				  product.quantity-=1;
				  product.disabled=false;
				  this.calculate(product);
			  }
		  });
	  }
  }
  
  delete(product) {
	  let index=-1;
	  this.products.forEach((p,i)=>{
		  if(p.id==product.id) index=i;
	  });
	  if(index > -1) {
		  product.disabled=true;
		  this.cartHttp.delete(product.id).subscribe((isDel: number) => {
			  if(isDel){
				  this.products.splice(index, 1);
				  this.calculate(null);
			  }
		  });
	  }
  }
  
  chechout() {
	this.isCheck=true;
	let data={ "user" : null, "paymet":null };
	this.cartHttp.chechout(data).subscribe((isOk: number) => {
		if(isOk){
			this.price_total=0;
			this.products=[];
			this.isChechout=true;
		}
		this.isCheck=false;
	});
  }
  
  calculate(product){
	  let tot=0;
	  if(product!=null){
		product.price_tot=product.price*product.quantity;
	  }
	  this.products.forEach(p=>{
		  tot+=p.price*p.quantity;
	  });
	  this.price_total=tot;
  }
  
  load(){
	  this.cartHttp.list().subscribe((data: any) => {
		  data.forEach(d=>{
			  d.price_tot=d.price*d.quantity;
		  });
		  this.products=data;
		  this.calculate(null);
	  });
  }

}
