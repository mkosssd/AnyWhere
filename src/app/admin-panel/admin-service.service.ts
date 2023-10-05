import { Injectable } from "@angular/core";
import "firebase/firestore";
import { AngularFirestore } from "@angular/fire/compat/firestore";
@Injectable({
	providedIn: "root",
})
export class AdminServiceService {
	constructor(
		private firestore: AngularFirestore
	) {}
	uploadProduct(prodObj: {}) {
		this.firestore
			.collection("products")
			.add({
				...prodObj,
				id: this.firestore.createId(),
			})
			.then(() => {
				console.log('Success');
				
			})
			.catch((err) => {
				console.log(err);
			});
	}
}
