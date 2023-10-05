import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/compat/firestore";
import { where } from "firebase/firestore";
import { Product } from "../shared/cart-data.service";
import { Router } from "@angular/router";
@Injectable({
	providedIn: "root",
})
export class DataService {
	constructor(
		private firestore: AngularFirestore
	) {}
	getProducts() {
		return this.firestore
			.collection("products", (ref) =>
				ref.orderBy("id")
			)
			.valueChanges();
	}
	deleteProduct(id: number) {
		this.firestore
			.collection("products", (ref) =>
				ref.where("id", "==", id)
			)
			.get()
			.subscribe((querySnapshot) => {
				querySnapshot.forEach((doc) => {
					doc.ref.delete().then(() => {
						console.log("deleted");
					});
				});
			});
	}
	getProductById(pid: string) {
		return this.firestore
			.collection("products", (ref) =>
				ref.where("id", "==", pid)
			)
			.valueChanges();
	}
	updateProduct(pid,data:{}){
		this.firestore
		.collection("products", (ref) =>
			ref.where("id", "==", pid)
		)
		.get()
		.subscribe((querySnapshot) => {
			querySnapshot.forEach((doc) => {
				doc.ref.update(data).then(() => {
					console.log("updated");
				});
			});
		});
	}
}
