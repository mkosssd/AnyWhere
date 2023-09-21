import { Component, OnInit } from "@angular/core";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import {
	CartDataService,
	Product,
} from "../shared/cart-data.service";
import {
	ActivatedRoute,
	Router,
} from "@angular/router";

@Injectable({ providedIn: "root" })
export class ServiceNameService {
	constructor(private httpClient: HttpClient) {}
}
@Component({
	selector: "app-products",
	templateUrl: "./products.component.html",
	styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
	constructor(
		private http: HttpClient,
		private cartServ: CartDataService,
		private route: ActivatedRoute,
		private router: Router
	) {}
	products: any;
	pageId: number;
	prods: any;
	produs: any;
	getData() {
		this.route.params.subscribe(
			(res) => (this.pageId = res["id"])
		);
		console.log(this.pageId);

		let storedPro =
			localStorage.getItem("cart") || "[]";
		let prods = JSON.parse(storedPro);
		let cart = prods;
		this.http
			.get<Product[]>(
				"http://localhost:3000/products"
			)
			.subscribe((res) => {
				this.produs = res.map((val) => {
					let index = cart.findIndex(
						(c) => c.id === val.id
					);

					if (index >= 0) {
						return {
							...val,
							isAdd: true,
							amount: cart[index].amount,
						};
					} else {
						return { ...val, isAdd: false };
					}
				});
				this.products = this.produs.splice(
					this.pageId * 10,
					10
				);
			});
	}
	isLoading = false;
	ngOnInit(): void {
		this.isLoading = true;
		this.getData();
		setTimeout(() => {
			this.isLoading = false;
		}, 2000);
	}
	productCart(index: number, method: string) {
		this.cartServ.data(
			this.products[index],
			method
		);
		this.getData();
	}
	toggleCart(index: number) {
		this.productCart(index, "add");
		this.products[index].isAdd =
			!this.products[index].isAdd;
	}
	page(method: string) {
		this.isLoading=true
		// this.router.navigate(["products/" + id]);
		if (method === "next") {
			this.pageId = 0;
			this.router.navigate([
				"products/" + this.pageId + 1,
			]);
		} else {
			this.pageId = 1;
			this.router.navigate([
				"products/" + (+this.pageId - 1),
			]);
		}
		this.getData();
		this.isLoading=false
	}
}
