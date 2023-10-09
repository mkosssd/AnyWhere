import { Component } from "@angular/core";
import {
	FormBuilder,
	FormGroup,
	Validators,
	FormControl,
} from "@angular/forms";
import { CartDataService } from "../shared/cart-data.service";

@Component({
	selector: "app-order",
	templateUrl: "./order.component.html",
	styleUrls: ["./order.component.scss"],
})
export class OrderComponent {
	orderForm: FormGroup;
	constructor(
		private formBuilder: FormBuilder,
		private cartData: CartDataService
	) {}

	productId = "";
	product: any;
	numRegex = /\d+$/;
	totalItems = 0;
	ngOnInit(): void {
		let user = localStorage.getItem(
			"currentUser"
		);
		let ObjUser = JSON.parse(user);
		this.orderForm = new FormGroup({
			name: new FormControl(
				"",
				Validators.required
			),
			email: new FormControl("", [
				Validators.required,
				Validators.email,
			]),
			address: new FormControl(
				"",
				Validators.required
			),
			contact: new FormControl(null, [
				Validators.required,
				Validators.pattern(this.numRegex),
			]),
		});
		this.orderForm.patchValue({
			name: `${ObjUser[0].firstName} ${ObjUser[0].lastName}`,
			email:`${ObjUser[0].email}`
		});
		this.totalItems =
			this.cartData.cartdata.length;
	}
	formHandler() {
		let cartItems = this.cartData.cartdata;
		cartItems.map((item) => {
			console.log(item.id);
			this.cartData.handleOrder(
				item.id,
				item.amount,
				item.stock
			);
		});
	}
}
