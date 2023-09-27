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
export interface Categories {
	id: number;
	name: string;
}
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
	categories: Categories[];
	indexArray: number[];
	ngOnInit(): void {
		this.getData();
		this.getCategories();
	}

	getData() {
		this.route.queryParams.subscribe((res) => {
			this.pageId = res["page"];

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

					this.indexArray = [];
					this.pagesArray.map((page) =>
						this.indexArray.push((page - 1) * 10)
					);

					this.isLoading = true;

					this.products = this.produs.splice(
						this.indexArray[this.pageId - 1],
						10
					);

					this.isLoading = false;
				});
		});
		this.minValue = 0;
		this.maxValue = 0;
		this.getCategories();
		this.route.queryParams.subscribe((res) => {
			if (res["price_min"]) {
				this.minValue = +res["price_min"];
				this.maxValue = +res["price_max"]
			}
			
		});
	}
	minValue = 0;
	maxValue=0;
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
				queryParamsHandling: "preserve",
			});
		} else {
			this.router.navigate(["/products"], {
				queryParams: { page: +this.pageId - 1 },
				queryParamsHandling: "preserve",
			});
		}
		this.getData();
		this.isLoading = false;
	}
	numbPage(page: any) {
		this.isLoading = true;

		this.router.navigate(["/products"], {
			queryParams: { page: page },
			queryParamsHandling: "merge",
		});

		this.getData();
		this.isLoading = false;
	}

	logger(min = 0, max = 1500) {
		console.log(min);
		console.log(max);
		let pageNum = 0;
		this.route.queryParams.subscribe((res) => {
			pageNum = res["page"];
		});
		this.router.navigate(["/products"], {
			queryParams: {
				price_min: `${min}`,
				price_max: `${max}`,
			},
			queryParamsHandling: "merge",
		});
		this.productService
			.getPriceRange()
			.subscribe((res) => {
				this.products = res.splice(
					this.indexArray[this.pageId - 1]
				);
				console.log(res);
			});
	}
	getCategories() {
		this.productService
			.getCategories()
			.subscribe(
				(res) =>
					(this.categories = res.splice(0, 4))
			);
	}
	categoryFilter(id: number) {
		console.log(id);
		this.router.navigate(["/products"], {
			queryParams: {
				categoryId: id,
			},
			queryParamsHandling: "merge",
		});
		this.productService
			.getProductByCategory()
			.subscribe((res) => {
				this.products = res;
			});
	}
}
