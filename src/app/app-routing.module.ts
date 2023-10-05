import { NgModule } from "@angular/core";
import {
	RouterModule,
	Routes,
} from "@angular/router";
import { ProductsComponent } from "./products/products.component";
import { CartComponent } from "./cart/cart.component";
import { AdminPanelComponent } from "./admin-panel/admin-panel.component";
import { LoginComponent } from "./auth/login/login.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { AuthGuard } from "./auth/auth.guard";
import { AddProductComponent } from "./admin-panel/add-product/add-product.component";
import { AddCategoryComponent } from "./admin-panel/add-category/add-category.component";
import { ProductListComponent } from "./admin-panel/product-list/product-list.component";
import { EditProductComponent } from "./admin-panel/edit-product/edit-product.component";
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
	{
		path: "admin",
		component: AdminPanelComponent,
		canActivate: [AuthGuard],
		children: [
			{
                path:'',
                redirectTo: 'product-list',
                pathMatch: 'full' 
            },
			
			{
				path: "add-product",
				component: AddProductComponent,
			},
			{
				path: "add-category",
				component: AddCategoryComponent,
			},
			{
				path: "product-list",
				component: ProductListComponent,
			},
			{
				path: "edit-product",children:[{
					path:':id',component:EditProductComponent
				}]
			},
		],
	},
	{ path: "login", component: LoginComponent },
	{ path: "signup", component: SignUpComponent },
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
