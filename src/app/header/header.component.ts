import { Component, OnInit,OnDestroy } from "@angular/core";
import { CartDataService } from "../shared/cart-data.service";
import { AuthService } from "../auth/auth.service";
@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
	constructor(private cart: CartDataService,private auth:AuthService) {}
	items = this.cart.cartdata.length;
	isAuth = false
	ngOnInit(): void {
		this.cart.items.subscribe(
			(res) => (this.items = res)
		);
		 this.auth.user.subscribe(user => {
		if(user){
			this.isAuth=true
		}else{
			this.isAuth=false
		}
			
		})
	}
	logout(){
		this.auth.logout()
	}
	
}
