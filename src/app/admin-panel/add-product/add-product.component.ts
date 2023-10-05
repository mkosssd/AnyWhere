import { Component,OnInit } from "@angular/core";
import { AdminServiceService } from "../admin-service.service";
import { NgForm } from "@angular/forms";
import {
	FormBuilder,
	FormGroup,
	Validators,
	FormControl,
} from "@angular/forms";
@Component({
	selector: "app-add-product",
	templateUrl: "./add-product.component.html",
	styleUrls: ["./add-product.component.scss"],
})
export class AddProductComponent implements OnInit{
	productForm:FormGroup
	numRegex=/\d+$/
	ngOnInit(): void {
		this.productForm = new FormGroup({
			title: new FormControl("",Validators.required),
			category: new FormControl("",Validators.required),
			images: new FormControl("",Validators.required),
			price: new FormControl(null,[Validators.required,Validators.pattern(this.numRegex)]),
			stock: new FormControl(null,[Validators.required,Validators.pattern(this.numRegex)]),
		});
	}
	list = [
		"smartphones",
		"skincare",
		"fragrances",
		"laptops",
		"groceries",
	];
	constructor(
		private prodService: AdminServiceService
	) {}
	formHandler() {
		let formValue = this.productForm.value;
		let img: string[] = [];
		img.push(formValue.images);
		console.log(img);

		let prodObj = {
			...formValue,
			images: img,
		};
		console.log(prodObj);

		this.prodService.uploadProduct(prodObj);
	}
	
}
