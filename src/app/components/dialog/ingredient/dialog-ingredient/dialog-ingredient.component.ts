import { Component , Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IngredientsPageComponent } from 'src/app/components/ingredientsPage/ingredients-page/ingredients-page.component';
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';
import { IIngredientIn, IIngredientOut } from 'src/app/interfaces/IIngredient';

@Component({
  selector: 'app-dialog-ingredient',
  templateUrl: './dialog-ingredient.component.html',
  styleUrls: ['./dialog-ingredient.component.css']
})
export class DialogIngredientComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef:MatDialogRef<IngredientsPageComponent>,
    private ingredientService: IngredientsService,
    private snackBar: MatSnackBar,
    private route:Router
  ) { }
  
  id!:number
  type!:string
  dialogTitle!:string
  selectedIngredient!: IIngredientOut
  ingredientFormGroup!:FormGroup
  
  nova_group = 
  [
    { name:"ONE" , value:"1" , text:"Aliments peu ou non transformés" },
    { name:"TWO" , value:"2" , text:"Ingrédients culinaires" },
    { name:"THREE" , value:"3" , text:"Aliments transformés" },
    { name:"FOUR" , value:"4" , text:"Aliments ultratransformés" }
  ]

  initFormGroup( type:string )
  {
    if( type === "add" )
    {
      this.ingredientFormGroup = new FormGroup({
        productNameControl : new FormControl("",[Validators.required , Validators.minLength(2)]),
        ingredientTextControl : new FormControl("",[Validators.required , Validators.minLength(2)]),
        carbohydratesControl : new FormControl( null , [Validators.required]),
        proteinsControl : new FormControl( null , [Validators.required]),
        fatsControl : new FormControl( null , [Validators.required]),
        saltControl : new FormControl( null , [Validators.required]),
        caloriesControl : new FormControl( null , [Validators.required]),
        novaGroupControl : new FormControl("",[Validators.required]),
        servingSizeControl : new FormControl("",[Validators.required]),
        categoriesControl : new FormControl(""),
        imageControlUrl : new FormControl( null ),
        imageControlFile : new FormControl( null )
      })
    }
    else
    {
      this.ingredientFormGroup = new FormGroup({
        productNameControl : new FormControl(),
        ingredientTextControl : new FormControl(),
        carbohydratesControl : new FormControl(),
        proteinsControl : new FormControl(),
        fatsControl : new FormControl(),
        saltControl : new FormControl(),
        caloriesControl : new FormControl(),
        novaGroupControl : new FormControl(),
        servingSizeControl : new FormControl(),
        categoriesControl : new FormControl(),
        imageControlUrl : new FormControl(),
        imageControlFile : new FormControl()
      })
    }
  }

  ngOnInit(): void 
  {
    const type = this.data.type

    this.initFormGroup( type )

    if( type === "add" ) this.dialogTitle = "Ajouter ingrédient"
    else
    {
      this.dialogTitle = "Modifier ingrédient"

      this.ingredientService.getIngredientById(this.data.id).subscribe( (res:IIngredientOut) => {
        this.selectedIngredient = res
        this.id = res.id
  
        const ingredient_text = res.ingredient_text.replace(/[".]/g,"").slice(1,-1)
        const categories = res.categories.replace(/[".]/g,"").slice(1,-1)
  
        this.ingredientFormGroup = new FormGroup({
          productNameControl : new FormControl(res.product_name,[Validators.required , Validators.minLength(2)]),
          ingredientTextControl : new FormControl( ingredient_text,[Validators.required , Validators.minLength(2)]),
          carbohydratesControl : new FormControl( res.carbohydrates , [Validators.required]),
          proteinsControl : new FormControl( res.proteins , [Validators.required]),
          fatsControl : new FormControl( res.fats , [Validators.required]),
          saltControl : new FormControl( res.salt , [Validators.required]),
          caloriesControl : new FormControl( res.calories , [Validators.required]),
          novaGroupControl : new FormControl(res.nova_group,[Validators.required]),
          servingSizeControl : new FormControl(res.serving_size,[Validators.required]),
          categoriesControl : new FormControl( categories ),
          imageControlUrl : new FormControl( res.image ),
          imageControlFile : new FormControl( null )
        })
      })
    }

  }

  onNoClick()
  {
    this.dialogRef.close()
  }

  save()
  {
    if( this.ingredientFormGroup.valid === false ) return

    let msg 

    const type = this.data.type

    if( type === "add" ) msg = "Ajouter ingrédient"
    
    if( type === "modif" ) msg = "Modifier ingrédient"
    
    let form = this.ingredientFormGroup.value
    
    const image = form.imageControlUrl ? form.imageControlUrl : form.imageControlFile

    let ingredient_text
    let categories

    if( form.ingredientTextControl != null )
    {
      ingredient_text = form.ingredientTextControl
      ingredient_text = ingredient_text.replace(/[".]/g ," ")
      ingredient_text = ingredient_text.replace(/[",]/g ,";")
      ingredient_text = ingredient_text.split(" ")
      ingredient_text = JSON.stringify(ingredient_text)
    }
    else ingredient_text = ""

    if( form.categoriesControl != null )
    {
      categories = form.categoriesControl
      categories = categories.replace(/[".]/g ," ")
      categories = categories.replace(/[",]/g ,";")
      categories = categories.split(" ")
      categories = JSON.stringify(categories)
    }
    else categories = form.categoriesControl = ""

    const carbohydrates = parseFloat(form.carbohydratesControl) || 0
    const proteins = parseFloat(form.proteinsControl) || 0
    const fats = parseFloat(form.fatsControl) || 0
    const salt = parseFloat(form.saltControl) || 0
    const calories = parseFloat(form.caloriesControl) || 0

    const ingredient:IIngredientIn =
    {
      product_name: form.productNameControl,
      ingredient_text: ingredient_text,
      carbohydrates: carbohydrates,
      proteins: proteins,
      fats: fats,
      salt: salt,
      calories: calories,
      nova_group: form.novaGroupControl,
      categories: categories,
      serving_size: form.servingSizeControl,
      image: image,
    }
    
    const snackBarRef = this.snackBar.open( `Annuler action : ${msg}` , "Undo" , { duration: 3000 } )
    snackBarRef.afterDismissed().subscribe( (e) => {
      
      if( e.dismissedByAction === true )
      {
        this.snackBar.open( "Annulation" , "" , { duration: 3000 } )
        return
      }

      this.ingredientService.addIngredient(ingredient).subscribe( () => {
        const snackBarRef_ = this.snackBar.open( "Opération terminée" , "" , { duration: 3000 } )
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
    return this.ingredientFormGroup.controls[controlName].hasError(errorName)
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
