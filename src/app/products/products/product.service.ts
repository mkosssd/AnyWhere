import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute } from "@angular/router";
import "firebase/firestore";
import { AngularFirestore } from "@angular/fire/compat/firestore";
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
		private actRoute: ActivatedRoute,
		private firestore: AngularFirestore
	) {}
	offset: number;
	prodRef = this.firestore;
	getProducts() {
		let res: any;
		this.actRoute.queryParams.subscribe(
			(resp) => {
				res = resp;
			}
		);
		if (
			res["price_min"] &&
			res["sort"] &&
			res["category"]
		) {
			console.log(res);

			return this.firestore
				.collection("products", (ref) =>
					ref.where(
							"price",
							">=",
							+res["price_min"]
						).where(
							"price",
							"<=",
							+res["price_max"]
						).orderBy(
							"price",
							res["sort"] == "desc"
								? "desc"
								: "asc"
						).where(
							"category",
							"==",
							res["category"]
						)
				)
				.valueChanges();
		} else if (res["price_min"] && res["sort"]) {
			console.log("reerre");

			return this.firestore
				.collection("products", (ref) =>
					ref.where(
							"price",
							">=",
							+res["price_min"]
						).where(
							"price",
							"<=",
							+res["price_max"]
						).orderBy(
							"price",
							res["sort"] == "desc"
								? "desc"
								: "asc"
						)
				).valueChanges();
		} else if(res["category"]&&res["price_min"]){
			return this.firestore
			.collection("products", (ref) =>
				ref
					.where(
						"price",
						">=",
						+res["price_min"]
					)
					.where(
						"price",
						"<=",
						+res["price_max"]
					).where("category",'==',res["category"])
			)
			.valueChanges();
		}
		else if (res["price_min"]) {
			return this.firestore
				.collection("products", (ref) =>
					ref
						.where(
							"price",
							">=",
							+res["price_min"]
						)
						.where(
							"price",
							"<=",
							+res["price_max"]
						)
				)
				.valueChanges();
		} else if (res["category"]) {
			return this.firestore
				.collection("products", (ref) =>
					ref.where(
						"category",
						"==",
						res["category"]
					)
				)
				.valueChanges();
		} else if (res["sort"]) {
			return this.firestore
				.collection("products", (ref) =>
					ref.orderBy(
						"price",
						res["sort"] == "desc" ? "desc" : "asc"
					)
				)
				.valueChanges();
		}
		return this.firestore
			.collectionGroup("products")
			.valueChanges();
	}

	getCategories() {
		return this.http.get(
			"https://dummyjson.com/products/categories"
		);
	}
}
