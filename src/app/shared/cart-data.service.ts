import {
	EventEmitter,
	Injectable,
	Output,
} from "@angular/core";

export interface Product {
	id: number;
	title: string;
	description: string;
	price: number;
	image: string;
	amount: number;
	isAdd: boolean;
}
@Injectable({
	providedIn: "root",
})
export class CartDataService {
	storedPro = localStorage.getItem("cart") || '{}';
	prods = JSON.parse(this.storedPro) ;
	cartdata: Product[] = this.prods;
	@Output() items = new EventEmitter();
	constructor() {}
	data(product: Product, method:string) {
		const productExistInCart = this.cartdata.find(
			({ id }) => id === product.id
			);
			console.log(productExistInCart);
			
			if (method === "add") {
				if (!productExistInCart) {
					this.cartdata.push({
						...product,
						amount: 1,
					});
				} else {
					productExistInCart.amount += 1;
				}
			} else {
				let index = this.cartdata.findIndex((p) => {
					return p.id === product.id;
				});
				if (productExistInCart?.amount == 1) {
					this.cartdata.splice(index, 1);
				} else {
					if (productExistInCart)
					productExistInCart.amount -= 1;
			}
			console.log(this.cartdata);
		}
		localStorage.setItem(
			"cart",
			JSON.stringify(this.cartdata)
			);
			this.items.emit(this.cartdata.length);
		}
	}