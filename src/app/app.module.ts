import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { ProductsComponent } from "./products/products.component";
import { CartComponent } from "./cart/cart.component";
import { HttpClientModule } from "@angular/common/http";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { LoaderComponent } from "./loader/loader.component";
import { MatTableModule } from "@angular/material/table";
import { MatSliderModule } from "@angular/material/slider";

import { AngularFireModule } from "@angular/fire/compat";
import {
	provideFirestore,
	getFirestore,
} from "@angular/fire/firestore";
import {
	initializeApp,
	provideFirebaseApp,
} from "@angular/fire/app";
import { environment } from "../enviroments/enviroments";
import {
	FormsModule,
	ReactiveFormsModule,
} from "@angular/forms";
import { LoginComponent } from "./auth/login/login.component";
import { SignUpComponent } from "./auth/sign-up/sign-up.component";
import { OrderComponent } from './order/order.component';

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		ProductsComponent,
		CartComponent,
		LoaderComponent,
		LoginComponent,
		SignUpComponent,
  OrderComponent,
	
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		HttpClientModule,
		MatCardModule,
		MatGridListModule,
		MatTableModule,
		MatSliderModule,
		AngularFireModule,
		ReactiveFormsModule,
		provideFirestore(() => getFirestore()),
		AngularFireModule.initializeApp(
			environment.firebaseConfig
		),
		provideFirebaseApp(() =>
			initializeApp(environment.firebaseConfig)
		),
	],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
