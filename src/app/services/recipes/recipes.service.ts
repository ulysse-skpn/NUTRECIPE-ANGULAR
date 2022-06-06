import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap , catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IRecipeIn, IRecipeOut } from 'src/app/interfaces/IRecipe';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  constructor(
    private http:HttpClient
  ) { }

  private host = environment.host
  private port = environment.port

  getSizeArrayRecipes():Observable<any>
  {
    const url = `http://${this.host}:${this.port}/recipes/size`
    return this.http.get(url)
    .pipe(
      tap( (data:any) => {
        console.log(data)
      }),
      retry(1),
      catchError(this.handleError)
    )
  }

  getAllRecipes(pageIndex:number,pageSize:number):Observable<IRecipeOut[]>
  {
    const url = `http://${this.host}:${this.port}/recipes/pagination`
    return this.http.post<IRecipeOut[]>(url,{pageIndex,pageSize})
    .pipe(
      tap( (data:IRecipeOut[]) => {
        console.log(data)
      }),
      retry(1),
      catchError(this.handleError)
    )
  }

  getRecipeById(id:number):Observable<IRecipeOut>
  {
    const url = `http://${this.host}:${this.port}/recipes/${id}`
    return this.http.get<IRecipeOut>(url)
    .pipe(
      tap( (data:IRecipeOut) => {
        console.log(data)
      }),
      retry(1),
      catchError(this.handleError)
    )
  }

  addRecipe(recipe:IRecipeIn):Observable<IRecipeOut>
  {
    const url = `http://${this.host}:${this.port}/recipes`
    return this.http.post<IRecipeOut>(url,recipe)
    .pipe(
      tap( (data:IRecipeOut) => console.log(data) ),
      retry(1),
      catchError(this.handleError)
    )
  }

  updateRecipe(recipe:IRecipeIn,id:number):Observable<any>
  {
    const url = `http://${this.host}:${this.port}/recipes/${id}`
    return this.http.put<any>(url,recipe)
    .pipe(
      tap( (data:any) => console.log(data) ),
      retry(1),
      catchError(this.handleError)
    )
  }

  deleteRecipe(id:number):Observable<any>
  {
    const url = `http://${this.host}:${this.port}/recipes/${id}`
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
