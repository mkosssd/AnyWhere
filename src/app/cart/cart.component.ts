import { Component, OnInit } from "@angular/core";
import {
	CartDataService,
	Product,
} from "../shared/cart-data.service";
import { Router } from "@angular/router";
import { AuthService } from "../auth/auth.service";

@Component({
	selector: "app-cart",
	templateUrl: "./cart.component.html",
	styleUrls: ["./cart.component.scss"],
})
export class CartComponent implements OnInit {
	dataSource: Product[];
	prods: any;
	totalAmount: number;
	displayedColumns: string[] = [
		"image",
		"title",
		"amount",
		"price",
		"actions",
		"total",
	];
	ngOnInit(): void {
		this.tableSync();
		this.prods = this.cart.cartdata;
		this.getTotal();
	}
	constructor(
		private cart: CartDataService,
		private router: Router,
		private auth: AuthService
	) {}
	tableSync() {
		this.cart.cart$.subscribe((res) => {
			this.dataSource = res;
		});
	}
	productCart(index: number, method: string) {
		this.cart.data(
			this.dataSource[index],
			method
		);
		this.prods = this.cart.cartdata;
		const newData = [...this.prods];
		this.dataSource = newData;
		this.getTotal();
	}
	getTotal() {
		this.totalAmount = 0;
		this.prods.map((item) => {
			this.totalAmount +=
				item.amount * item.price;
		});
	}
	onOrder = null;
	placeOrderHandler() {
		this.auth.user.subscribe((res) => {
			if (res) {
				this.onOrder =
					"Redirecting to Order page...";
				setTimeout(() => {
					this.router.navigate(["order"]);
				}, 300);
			} else {
				this.onOrder =
					"User not logged in.Redirecting to Login page...";
				setTimeout(() => {
					this.router.navigate(["login"]);
				}, 300);
			}
		});
	}
}
