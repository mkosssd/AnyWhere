import { Component, OnInit } from "@angular/core";
import { DataService } from "../data.service";
import { Product } from "src/app/shared/cart-data.service";
import { Router } from "@angular/router";

@Component({
	selector: "app-product-list",
	templateUrl: "./product-list.component.html",
	styleUrls: ["./product-list.component.scss"],
})
export class ProductListComponent
	implements OnInit
{
	productsList: Product[];
	constructor(private data: DataService,private router:Router) {}
	ngOnInit(): void {
		this.data
			.getProducts()
			.subscribe(
				(res: Product[]) =>
					(this.productsList = res)
			);
	}
	editProduct(pid: number) {
		this.router.navigate([`admin/edit-product/${pid}`])
		// console.log(pid);
		
	}
	deleteProduct(pid: number,i:number) {
    this.productsList.splice(i,1)
    this.data.deleteProduct(pid)
  }
}
