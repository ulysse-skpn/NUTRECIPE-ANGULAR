import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';
import { RecipesService } from 'src/app/services/recipes/recipes.service';
import { RootService } from 'src/app/services/root-service/root.service';
import { UsersService } from 'src/app/services/users/users.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  ingredients_size!:number
  recipes_size!:number
  users_size!:number
  nameUser:string = "" 

  constructor(
    private rootService:RootService,
    private ingredientService:IngredientsService,
    private recipeService:RecipesService,
    private userService:UsersService,
    private router:Router
  ) { }

  ngOnInit(): void 
  {
    const token = sessionStorage.getItem("access_token")
    const name = sessionStorage.getItem("nameUser")

    if ( token === null ) this.router.navigate(["/notauthorized"])
    
    if ( name != null ) this.nameUser = name 

    this.getIngredientElements()
    this.getRecipeElements()
    this.getUserElements()
  }

  getIngredientElements()
  {    
    this.ingredientService.getSizeArrayIngredients().subscribe( res => {
      this.ingredients_size = res.nbElem
    })
  }

  getRecipeElements()
  {
    this.recipeService.getSizeArrayRecipes().subscribe( res => {
      this.recipes_size = res.nbElem
    })
  }

  getUserElements()
  {
    this.userService.getSizeArrayUsers().subscribe( res => {
      this.users_size = res.nbElem
    })
  }

  logout()
  {
    this.rootService.logout()
  }

}
