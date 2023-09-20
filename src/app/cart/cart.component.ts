import { Component, OnInit } from "@angular/core";
import {
	CartDataService,
	Product,
} from "../shared/cart-data.service";

@Component({
	selector: "app-cart",
	templateUrl: "./cart.component.html",
	styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
	constructor(private cart: CartDataService) {}
	prods: Product[] = [];
  totalAmount = 0
	ngOnInit(): void {
		this.prods = this.cart.cartdata;
    this.prods.map(res=>{
      this.totalAmount+=res.amount*res.price
    })
	}
  productCart(index: number, method: string) {
    this.totalAmount=0
    this.cart.data(
      this.prods[index],
			method
      );
      this.prods.map(res=>{
        this.totalAmount+=res.amount*res.price
      })
    }
}
