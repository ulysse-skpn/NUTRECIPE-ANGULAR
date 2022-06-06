import { Component , Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RecipesService } from 'src/app/services/recipes/recipes.service';
import { IRecipeIn, IRecipeOut } from 'src/app/interfaces/IRecipe';
import { RecipesPageComponent } from 'src/app/components/recipesPage/recipes-page/recipes-page.component';

@Component({
  selector: 'app-dialog-recipe',
  templateUrl: './dialog-recipe.component.html',
  styleUrls: ['./dialog-recipe.component.css']
})
export class DialogRecipeComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef:MatDialogRef<RecipesPageComponent>,
    private recipeService: RecipesService,
    private snackBar: MatSnackBar,
    private route:Router
  ) { }

  id!:number
  type!:string
  dialogTitle!:string
  selectedRecipe!: IRecipeOut
  recipeFormGroup!:FormGroup
  

  initFormGroup( type:string )
  {
    if( type === "add" )
    {
      this.recipeFormGroup = new FormGroup({
        titleControl : new FormControl("",[Validators.required]),
        prepTimeControl : new FormControl(""),
        cookingTimeControl : new FormControl(""),
        restTimeControl : new FormControl(""),
        categoriesControl : new FormControl(""),
        ingredientsListControl : new FormControl("",[Validators.required]),
        servingSizeControl : new FormControl("",[Validators.required]),
        instructionsControl : new FormControl("",[Validators.required]),
        imageControlUrl : new FormControl( null ),
        imageControlFile : new FormControl( null )
      })
    }
    else
    {
      this.recipeFormGroup = new FormGroup({
        titleControl : new FormControl(),
        prepTimeControl : new FormControl(),
        cookingTimeControl : new FormControl(),
        restTimeControl : new FormControl(),
        categoriesControl : new FormControl(),
        ingredientsListControl : new FormControl(),
        servingSizeControl : new FormControl(),
        instructionsControl : new FormControl(),
        imageControlUrl : new FormControl(),
        imageControlFile : new FormControl()
      })
    }
  }

  onNoClick()
  {
    this.dialogRef.close()
  }

  ngOnInit(): void 
  {
    const type = this.data.type

    this.initFormGroup( type )

    if( type === "add") this.dialogTitle = "Ajouter recette"
    else 
    {
      this.dialogTitle = "Modifier recette"

      this.recipeService.getRecipeById(this.data.id).subscribe( (res:IRecipeOut) => {
        this.selectedRecipe = res
        this.id = res.id

        const ingredients_list = res.ingredients_list.replace(/[".]/g,"").slice(1,-1)
        const instructions = res.instructions.replace(/[".]/g,"").slice(1,-1)
        const categories = res.categories.replace(/[".]/g,"").slice(1,-1)

        this.recipeFormGroup = new FormGroup({
          titleControl : new FormControl( res.title ,[Validators.required]),
          prepTimeControl : new FormControl( res.prep_time ),
          cookingTimeControl : new FormControl( res.cooking_time ),
          restTimeControl : new FormControl( res.rest_time ),
          categoriesControl : new FormControl( categories ),
          ingredientsListControl : new FormControl( ingredients_list ,[Validators.required]),
          servingSizeControl : new FormControl( res.serving_size ,[Validators.required]),
          instructionsControl : new FormControl( instructions ,[Validators.required]),
          imageControlUrl : new FormControl( res.image ),
          imageControlFile : new FormControl( null )
        })
      })
    }

  }
  
  save()
  {
    if( this.recipeFormGroup.valid === false ) return
    
    let msg 

    const type = this.data.type

    if( type === "add" ) msg = "Ajouter recette"
    
    if( type === "modif" ) msg = "Modifier recette"

    let form = this.recipeFormGroup.value
    
    const image = form.imageControlUrl ? form.imageControlUrl : form.imageControlFile

    let ingredients_list , categories , instructions


    if( form.ingredientsListControl ) ingredients_list = this.formatString(form.ingredientsListControl)
    else ingredients_list = ""

    if( form.categoriesControl ) categories = this.formatString(form.categoriesControl)
    else categories = ""

    if( form.instructionsControl ) instructions = this.formatString(form.instructionsControl)
    else instructions = ""

    const prepTime = form.prepTimeControl.length === 0 ? null : form.prepTimeControl
    const cookingTime = form.cookingTimeControl.length === 0 ? null : form.cookingTimeControl
    const restTime = form.restTimeControl.length === 0 ? null : form.restTimeControl

    const recipe:IRecipeIn =
    {
      title: form.title,
      prep_time: prepTime,
      cooking_time: cookingTime,
      rest_time: restTime,
      categories: categories,
      ingredients_list: ingredients_list,
      serving_size: form.serving_size,
      instructions: instructions,
      image: image
    }
    
    const snackBarRef = this.snackBar.open( `Annuler action : ${msg}` , "Undo" , { duration: 3000 } )
    snackBarRef.afterDismissed().subscribe( (e) => {
      
      if( e.dismissedByAction === true )
      {
        this.snackBar.open( "Annulation" , "" , { duration: 3000 } )
        return
      }

      this.recipeService.addRecipe(recipe).subscribe( () => {
        const snackBarRef_ = this.snackBar.open( `Opération terminée` , "" , { duration: 3000 } )
        snackBarRef_.afterDismissed().subscribe(() => {
          this.dialogRef.close()

          let currentUrl = this.route.url;
          this.route.routeReuseStrategy.shouldReuseRoute = () => false;
          this.route.onSameUrlNavigation = 'reload';
          this.route.navigate([currentUrl]);
        })
      })
    })
  }

  getErrorMessage(controlName:string,errorName:string)
  {
    return this.recipeFormGroup.controls[controlName].hasError(errorName)
  }

  formatString( string:string )
  {
    string = string.replace(/[\[\]']+/g," ")
    string = string.replace(/[.]/g ," ")
    string = string.replace(/[,]/g ,";")
    string = JSON.stringify(string.split(";"))
    return string
  }
}
