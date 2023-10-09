import { NgModule } from "@angular/core";
import {
	RouterModule,
	Routes,
} from "@angular/router";
import { ProductsComponent } from "./products/products.component";
import { CartComponent } from "./cart/cart.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { OrderComponent } from "./order/order.component";
const routes: Routes = [
	{
		path: "",
		redirectTo: "products",
		pathMatch: "full",
	},
	{
		path: "products",
		component: ProductsComponent,
	},

	{ path: "cart", component: CartComponent },

	{ path: "login", component: LoginComponent },
	{ path: "signup", component: SignUpComponent },
	{ path: "order", component: OrderComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
