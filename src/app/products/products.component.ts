import {
	Component,
	OnInit,
	OnDestroy,
} from "@angular/core";
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
import { Subscription } from "rxjs";
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
export class ProductsComponent
	implements OnInit, OnDestroy
{
	constructor(
		private http: HttpClient,
		private cartServ: CartDataService,
		private route: ActivatedRoute,
		private router: Router,
		private productService: ProductService
	) {}
	ObsSubs: Subscription;
	products: any;
	pageId: number = 1;
	prods: any;
	isLoading: boolean = false;
	resp: any;
	produs: any;
	totalPages: number;
	pagesArray: number[];
	categories: any;
	indexArray: number[];
	sortMeth: string;
	minValue = 0;
	maxValue = 0;
	ngOnInit(): void {
		this.getData();
		this.getCategories();
	}
	ngOnDestroy(): void {
		this.ObsSubs.unsubscribe();

	}
	getData() {
		this.route.queryParams.subscribe((res) => {
			this.pageId = res["page"];
			this.sortMeth = res["sort"];
			let storedPro =
				localStorage.getItem("cart") || "[]";
			this.prods = JSON.parse(storedPro);
			this.defCategoryRoute = "";
			this.ObsSubs = this.productService
				.getProducts()
				.subscribe((res: Product[]) => {
					// console.log(res);
					this.products = res;
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
				this.minValue = 0;
				this.maxValue = 1800;
			}
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
		console.log(index);

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
		// this.getData();
		this.getCategories();
		this.isLoading = false;
	}
	numbPage(page: any) {
		this.isLoading = true;

		this.router.navigate(["/products"], {
			queryParams: { page: page },
			queryParamsHandling: "merge",
		});

		// this.getData();
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
	
	}
	defCategoryRoute = "";
	getCategories() {
		this.productService.getCategories().subscribe((res: any) => {
			this.categories = Object.values(res);
		

				this.route.queryParams.subscribe(
					(res) => {
						let id = res["category"];

						let ind = this.categories.find(
							(e) => e === id
						);

						if (ind) {
							this.defCategoryRoute = ind;
						}
					}
				);
			});
	}
	categoryFilter(val: string) {
		this.router.navigate(["/products"], {
			queryParams: {
				category: val,
			},
			queryParamsHandling: "merge",
		});
	}
	addSort(method) {
		this.router.navigate(["products"], {
			queryParams: { sort: method },
			queryParamsHandling: "merge",
		});
	}
	
}
