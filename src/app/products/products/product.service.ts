import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "src/app/shared/cart-data.service";
import { ActivatedRoute } from "@angular/router";
import { Categories } from "../products.component";
import { retry } from "rxjs";
export interface paramsObject {
	offset: string;
	limit: string;
}
@Injectable({
	providedIn: "root",
})
export class ProductService {
	constructor(
		private http: HttpClient,
		private actRoute: ActivatedRoute
	) {}
	offset: number;
	getProducts() {
		let res: any;
		this.actRoute.queryParams.subscribe(
			(resp) => {
				res = resp;
			}
		);
		if (res["offset"]) {
			if (
				Object.keys(res).length === 0 &&
				res.constructor === Object
			) {
				this.offset = 1;
			} else {
				this.offset = res["page"];
				console.log(this.offset);
			}

			return this.http.get<Product[]>(
				`https://api.escuelajs.co/api/v1/products?offset=${
					this.offset * 10
				}&limit=50`
			);
		} else if (res["price_min"]) {
			return this.getPriceRange();
		} else if (res["categoryId"]) {
			return this.getProductByCategory();
		} else {
			return this.http.get<Product[]>(
				`https://api.escuelajs.co/api/v1/products?offset=10&limit=50`
			);
		}
	}
	getPriceRange() {
		let resp: any;
		this.actRoute.queryParams.subscribe(
			(res) => (resp = res)
		);

		return this.http.get<Product[]>(
			`https://api.escuelajs.co/api/v1/products?offset=10&limit=50&price_min=${+resp.price_min}&price_max=${+resp.price_max}`
		);
	}
	getCategories() {
		return this.http.get<Categories[]>(
			"https://api.escuelajs.co/api/v1/categories"
		);
	}
	getProductByCategory() {
		let resp: any;
		this.actRoute.queryParams.subscribe(
			(res) => (resp = res)
		);
		console.log(resp, "sdsd");
    let url = `https://api.escuelajs.co/api/v1/products?offset=10&limit=50&categoryId=${resp.categoryId}`
    console.log(url);
    
		return this.http.get<Product[]>(url
			
		);
	}
}
