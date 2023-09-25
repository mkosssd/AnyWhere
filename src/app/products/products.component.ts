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
import { ProductService } from "./products/product.service";

@Injectable({ providedIn: "root" })
export class ServiceNameService {}
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
		private router: Router,
		private productService: ProductService
	) {}
	products: any;
	pageId: number = 1;
	prods: any;
	isLoading: boolean = false;
	produs: any;
	totalPages: number;
	pagesArray: number[];
	indexArray: number[];
	ngOnInit(): void {
		this.getData();
	}
	getData() {
		this.route.queryParams.subscribe((res) => {
			this.pageId = res["page"];
			console.log(res);

			let storedPro =
				localStorage.getItem("cart") || "[]";
			this.prods = JSON.parse(storedPro);

			this.productService
				.getProducts()
				.subscribe((res) => {
					this.produs = res.map((val) => {
						let index = this.prods.findIndex(
							({ id }) => id === val.id
						);

						if (index >= 0) {
							return {
								...val,
								isAdd: true,
								amount: this.prods[index].amount,
							};
						} else {
							return { ...val, isAdd: false };
						}
					});
					console.log(this.pageId);

					this.totalPages = Math.ceil(
						this.produs.length / 10
					);
					this.pagesArray = Array.from(
						{ length: this.totalPages },
						(_, i) => i + 1
					);
					console.log(this.pagesArray);
					let s = [];
					this.pagesArray.map((page) =>
						s.push((page - 1) * 10)
					);

					this.isLoading = true;

					this.products = this.produs.splice(
						s[this.pageId - 1],
						10
					);

					this.isLoading = false;
				});
		});
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
		if (isNaN(this.pageId)) {
			console.log("yes");
			this.pageId = 1;
		}
		this.isLoading = true;
		if (method === "next") {
			this.router.navigate(["/products"], {
				queryParams: { page: +this.pageId + 1 },
			});
		} else {
			this.router.navigate(["/products"], {
				queryParams: { page: +this.pageId - 1 },
			});
		}
		this.getData();
		this.isLoading = false;
	}
	numbPage(page: any) {
		this.isLoading = true;

		this.router.navigate(["/products"], {
			queryParams: { page: page },
		});

		this.getData();
		this.isLoading = false;
	}
}
