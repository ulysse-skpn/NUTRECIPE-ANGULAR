import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap , catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { StorageService } from '../storage/storage.service';
import { ICredentialsIn } from 'src/app/interfaces/ICredentials';
import { IUserIn, IUserOut } from 'src/app/interfaces/IUser';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RootService {

  constructor(
    private http:HttpClient,
    private route:Router,
    private storageService:StorageService
  ) { }

  private host = environment.host
  private port = environment.port

  login(credentials:ICredentialsIn): Observable<IUserOut>
  {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });
    const url = `http://${this.host}:${this.port}/login`
    return this.http.post<IUserOut>(url,credentials,{headers:reqHeader})
                    .pipe(
                      tap( (data:IUserOut) => {
                        console.log(data)
                      }),
                      retry(1),
                      catchError(this.handleError)
                    )
  }


  register(user:IUserIn): Observable<IUserOut>
  {
    const reqHeader = new HttpHeaders({ 'Content-Type': 'application/json', 'No-Auth': 'True' });
    const url = `http://${this.host}:${this.port}/register`
    return this.http.post<IUserOut>(url,user,{ headers: reqHeader })
                    .pipe(
                      tap( (data:IUserOut) => {
                        console.log(data)
                      }),
                      retry(1),
                      catchError(this.handleError)
                    )
  }


  forgotPassword(email:object): Observable<any>
  {
    const url = `http://${this.host}:${this.port}/forgotPassword`
    return this.http.post<any>(url,email)
                    .pipe(
                      tap( (data:any) => {
                        console.log(data)
                      }),
                      retry(1),
                      catchError(this.handleError)
                    )
  }

  logout()
  {
    sessionStorage.removeItem("access_token")
    sessionStorage.removeItem("expiresIn")
    
    this.route.routeReuseStrategy.shouldReuseRoute = () => false;
    this.route.onSameUrlNavigation = 'reload';
    this.route.navigate(["/"]);
  }

  getToken()
  {
    return sessionStorage.getItem("access_token")
  }

  isLoggedIn():boolean
  { 
    const token = sessionStorage.getItem("access_token")
    return token !== null ? true : false
  }

  private handleError(error:any)
  {
    let errorMessage = ""

    if( error.error instanceof ErrorEvent ) errorMessage = `Error : ${error.error.message}`
    else errorMessage = `Error code : ${error.status} \t Message : ${error.message}`

    console.log(errorMessage);

    return throwError( () => {
      return errorMessage
    })
    
  }

}
