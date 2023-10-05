import { Component, OnInit,OnDestroy } from "@angular/core";
import { CartDataService } from "../shared/cart-data.service";
import { AuthService } from "../auth/auth.service";
import { Subscription } from 'rxjs'
@Component({
	selector: "app-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
	constructor(private cart: CartDataService,private auth:AuthService) {}
	private userSub:Subscription
	items = this.cart.cartdata.length;
	isAuth = false
	ngOnInit(): void {
		this.cart.items.subscribe(
			(res) => (this.items = res)
		);
		this.userSub = this.auth.user.subscribe(user => {
			this.isAuth = !!user
			console.log(user);
			
		})
	}
	logout(){
		this.auth.logout()
	}
	
}
