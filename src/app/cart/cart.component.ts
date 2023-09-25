import { Component, OnInit } from "@angular/core";
import {
	CartDataService,
	Product,
} from "../shared/cart-data.service";
import { provideCloudflareLoader } from "@angular/common";

@Component({
	selector: "app-cart",
	templateUrl: "./cart.component.html",
	styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
	tableSync() {
		this.cart.cart$.subscribe((res) => {
			this.dataSource = res;
		});
	}
	ngOnInit(): void {
		this.tableSync();
		this.prods = this.cart.cartdata;
		// this.dataSource.push(...this.prods);
	}
	constructor(private cart: CartDataService) {}
	dataSource: Product[];
	prods:any;
	displayedColumns: string[] = [
		"image",
		"title",
		"amount",
		"price",
		"actions",
		"total",
	];
	productCart(index: number, method: string) {
		this.cart.data(
			this.dataSource[index],
			method
		);
		this.prods = this.cart.cartdata;
		const newData = [...this.prods];
		this.dataSource = newData;
		
	}
}
