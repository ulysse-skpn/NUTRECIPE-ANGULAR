import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap , catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http:HttpClient
  ) { }

  private host = environment.host
  private port = environment.port

  getSizeArrayUsers():Observable<any>
  {
    const url = `http://${this.host}:${this.port}/users/size`
    return this.http.get(url)
    .pipe(
      tap( (data:any) => {
        console.log(data)
      }),
      retry(1),
      catchError(this.handleError)
    )
  }

  getAllUsers(pageIndex:number,pageSize:number):Observable<any[]>
  {
    const url = `http://${this.host}:${this.port}/users/pagination`
    return this.http.post<any[]>(url,{pageIndex,pageSize})
    .pipe(
      tap( (data:any[]) => {
        console.log(data)
      }),
      retry(1),
      catchError(this.handleError)
    )
  }

  getUserById(id:number):Observable<any>
  {
    const url = `http://${this.host}:${this.port}/users/${id}`
    return this.http.get<any>(url)
    .pipe(
      tap( (data:any) => {
        console.log(data)
      }),
      retry(1),
      catchError(this.handleError)
    )
  }

  addUser(user:any):Observable<any>
  {
    const url = `http://${this.host}:${this.port}/users`
    return this.http.post<any>(url,user)
    .pipe(
      tap( (data:any) => console.log(data) ),
      retry(1),
      catchError(this.handleError)
    )
  }

  updateUser(user:any,id:number):Observable<any>
  {
    const url = `http://${this.host}:${this.port}/users/${id}`
    return this.http.put<any>(url,user)
    .pipe(
      tap( (data:any) => console.log(data) ),
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteUser(id:number):Observable<any>
  {
    const url = `http://${this.host}:${this.port}/users/${id}`
    return this.http.delete(url)
    .pipe(
      tap( (data:any) => console.log(data) ),
      retry(1),
      catchError(this.handleError)
    )
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
