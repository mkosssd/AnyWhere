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
	resp: any;
	produs: any;
	totalPages: number;
	pagesArray: number[];
	categories: Categories[];
	indexArray: number[];
	sortMeth: string;
	ngOnInit(): void {
		this.getData();
		this.getCategories();
	}

	getData() {
		this.route.queryParams.subscribe((res) => {
			this.pageId = res["page"];
			this.sortMeth = res["sort"];
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
					if (this.sortMeth) {
						if (this.sortMeth === "asec") {
							this.produs = this.produs.sort(
								(a, b) => {
									return a.price - b.price;
								}
							);
						} else {
							this.produs = this.produs.sort(
								(a, b) => {
									return b.price - a.price;
								}
							);
						}
					}
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
				this.maxValue = +res["price_max"];
			} else {
				this.minValue = 100;
				this.maxValue = 1500;
			}
		});
		this.sortProducts(this.sortMeth);
	}
	minValue = 0;
	maxValue = 0;
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
				queryParamsHandling: "merge",
			});
		} else {
			this.router.navigate(["/products"], {
				queryParams: { page: +this.pageId - 1 },
				queryParamsHandling: "merge",
			});
		}
		this.sortProducts(this.sortMeth)
		this.getData();
		this.isLoading = false;
		this.getCategories();
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
	defCategoryRoute = 0;
	getCategories() {
		this.productService
			.getCategories()
			.subscribe((res) => {
				this.categories = res.splice(0, 4);

				this.route.queryParams.subscribe(
					(res) => {
						let id = res["categoryId"];

						let x = this.categories.find(
							(e) => e.id === +id
						);
						if (x) this.defCategoryRoute = x.id;
					}
				);
			});
	}
	categoryFilter(id: number) {
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
	addSort(method){
		this.router.navigate(["products"], {
			queryParams: { sort: method },
			queryParamsHandling: "merge",
		});
		this.sortProducts(method)
	}
	sortProducts(method: string) {
		
		if (method === "asec") {
			this.products = this.produs.sort(
				(a, b) => {
					return a.price - b.price;
				}
			);
		} else {
			this.products = this.produs.sort(
				(a, b) => {
					return b.price - a.price;
				}
			);
		}

	}
}
