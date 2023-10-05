import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { DataService } from "../data.service";
import {
	FormBuilder,
	FormGroup,
	Validators,
	FormControl,
} from "@angular/forms";
@Component({
	selector: "app-edit-product",
	templateUrl: "./edit-product.component.html",
	styleUrls: ["./edit-product.component.scss"],
})
export class EditProductComponent
	implements OnInit
{
	productForm: FormGroup;
	constructor(
		private actRoute: ActivatedRoute,
		private data: DataService,
		private formBuilder: FormBuilder
	) {}

	productId = "";
	product: any;
	numRegex=/\d+$/

	ngOnInit(): void {
		this.actRoute.params.subscribe(
			(res) => (this.productId = res["id"])
		);

		this.productForm = new FormGroup({
			title: new FormControl("",Validators.required),
			category: new FormControl("",Validators.required),
			images: new FormControl("",Validators.required),
			price: new FormControl(null,[Validators.required,Validators.pattern(this.numRegex)]),
			stock: new FormControl(null,[Validators.required,Validators.pattern(this.numRegex)]),
		});
		this.data
			.getProductById(this.productId)
			.subscribe((res: any) => {
				this.product = res;
				this.productForm.patchValue({
					title: res[0].title,
					category: res[0].category,
					images: res[0].images[0],
					price: res[0].price,
					stock: res[0].stock,
				});
			});
	}


	list = [
		"smartphones",
		"skincare",
		"fragrances",
		"laptops",
		"groceries",
	];

	formHandler() {
		let formValue = this.productForm.value;
		let img: string[] = [];
		img.push(formValue.images);
		console.log(img);

		let prodObj = {
		...formValue,
			images: img,
			id: this.productId,
		};
		console.log(prodObj);

		this.data.updateProduct(this.product[0]['id'],prodObj)
	}
}
