import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { environment } from "src/enviroments/enviroments";
import { BehaviorSubject, catchError, tap } from "rxjs";
import { Router } from "@angular/router";
import { IntUserData } from "./user.model";
export interface AuthResponseData {
	kind: string;
	idToken: string;
	email: string;
	refreshToken: string;
	expiresIn: string;
	localId: string;
	registered?: boolean;
}
@Injectable({
	providedIn: "root",
})
export class AuthService {
	constructor(
		private http: HttpClient,
		private router: Router
	) {}
	users = localStorage.getItem("users") || "";
  user = new BehaviorSubject<IntUserData | null>(null)
	objUsers: any;
	getUsers() {
		this.http
			.get("http://localhost:3000/users")
			.subscribe((res) => (this.objUsers = res));
	}
	signup(form: any) {
		const email = form.email;
		const password = form.inputPassword;
		return this.http
			.post<AuthResponseData>(
				"https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="+environment.API_KEY,
				{
					email,
					password,
					returnSecureToken: true,
				}
			)
			.pipe(catchError(this.handleError),
				tap((resData:any) => {
					this.handleAuth(
						resData.email,
						resData.localId,
						resData.idToken,
						+resData.expiresIn
					);
				})
			);
	}
 private handleError(error:HttpErrorResponse){
   console.log(error.error.error.message);
   return error.error
    
  }
	private handleAuth(
		email: string,
		userId: string,
		token: string,
		expiresIn: number
	) {
		const expiresInDate = new Date(
			new Date().getTime() + expiresIn * 1000
		);
		const userDetails = new IntUserData(
			email,
			userId,
			token,
			expiresInDate
		);
		this.user.next(userDetails);

		localStorage.setItem(
			"loggedData",
			JSON.stringify(userDetails)
		);
	}


  login (email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBsv9RRWMipsQbrgOvq16gClAraUZRZA3U' ,
        {
          email,
          password,
          returnSecureToken: true
        }
      )
      .pipe(
        catchError(this.handleError),
        tap((resData:any) => {
          this.handleAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          )
		  this.user.next(resData.idToken)
		  this.router.navigate(['/admin'])

        })
      )
  }

	isLogged() {
		return localStorage.getItem("loggedData");
	}
	logout () {
		this.user.next(null)
		localStorage.removeItem('loggedData')
		this.router.navigate(['/login'])
	
	  }
	  autoLogin () {
		const loggedDataString: string | null = localStorage.getItem('loggedData')
		const loggedUserData: {
		  email: string
		  userId: string
		  _token: string
		  _tokenExpirationDate: string
		} | null = loggedDataString ? JSON.parse(loggedDataString) : null
	
		if (!loggedUserData) {
		  return
		}
	
		const loadedUser = new IntUserData(
		  loggedUserData.email,
		  loggedUserData.userId,
		  loggedUserData._token,
		  new Date(loggedUserData._tokenExpirationDate)
		)
	
		if (loadedUser.token) {
		  this.user.next(loadedUser)
		 } }
	 
}
