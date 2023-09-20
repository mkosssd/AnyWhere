import { Component, OnInit } from "@angular/core";
import { CartDataService } from "../shared/cart-data.service";

@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
	constructor(private cart: CartDataService) {}
	items = this.cart.cartdata.length;
	ngOnInit(): void {
		this.cart.items.subscribe(
			(res) => (this.items = res)
		);
	}
}
