
import { Component, OnInit, ViewChild } from '@angular/core';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { RecipesService } from 'src/app/services/recipes/recipes.service';
import { IRecipeOut } from 'src/app/interfaces/IRecipe';
import { DialogRecipeComponent } from '../../dialog/recipe/dialog-recipe/dialog-recipe.component';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';

@Component({
  selector: 'app-recipes-page',
  templateUrl: './recipes-page.component.html',
  styleUrls: ['../../pages.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ]
})
export class RecipesPageComponent implements OnInit {

  @ViewChild(MatPaginator) paginator!: MatPaginator
  @ViewChild(MatSort) sort!: MatSort

  columnsToDisplay = ['id', 'title' , 'prep_time' , 'cooking_time' , 'rest_time' , 'modif' , 'suppr' ]
  ELEMENT_DATA:IRecipeOut[] = []
  dataSource:MatTableDataSource<IRecipeOut> = new MatTableDataSource() 
  expandedElement!:any | null
  pageSize!:number
  pageIndex:number = 0
  pageSizeOptions: number[] = [10, 30, 50 , 100];
  isLoading:boolean = false
  durationInSeconds = 5

  constructor(
    private recipeService:RecipesService,
    private snackBar: MatSnackBar,
    public dialog: MatDialog,
    private jwtHelper: JwtHelperService,
    private router:Router
  ) { }


  ngOnInit(): void 
  {
    const token = sessionStorage.getItem("access_token")

    if( token && this.jwtHelper.isTokenExpired(token) ) this.router.navigate(["/"])
    else this.sizeRecipesArray()
  }

  add()
  {
    this.openAddDialog()
  }

  edit(event: Event , id:number)
  {
    event.stopPropagation();
    this.openModifDialog(id)
  }

  delete(event:Event , id:number)
  {
    event.stopPropagation();

    const snackBarRef = this.snackBar.open( "Annuler action : 'Supprimer'" , "Undo" , { duration: 3000 } )
    snackBarRef.afterDismissed().subscribe( (e) => {
      if( e.dismissedByAction === true )
      {
        this.snackBar.open( "Annulation" , "" , { duration: 2000 } )
        return
      }

      this.recipeService.deleteRecipe(id).subscribe( () => {
        this.snackBar.open( "Elément supprimé" , "" , { duration: 2000 } )
      })
    })
  }

  openAddDialog()
  {
    this.dialog.open(DialogRecipeComponent , {
      data: { type:'add' },
      minWidth:'300px'
    });
  }

  openModifDialog(id:number)
  {
    this.dialog.open(DialogRecipeComponent , {
      data: { id: id , type:'modif' },
      minWidth:'300px'
    });
  }

  applyFilter(event:Event) 
  {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  sizeRecipesArray()
  {
    this.recipeService.getSizeArrayRecipes().subscribe( (res) => {
      this.pageSize = res.nbElem

      this.loadRecipes()
    })
  }

  loadRecipes( pageIndex = this.pageIndex , pageSize = this.pageSize )
  {
    this.isLoading = true

    this.recipeService.getAllRecipes(pageIndex,pageSize).subscribe( async(res:IRecipeOut[]) => {
      this.isLoading = false
      this.ELEMENT_DATA = res
      this.dataSource = new MatTableDataSource(this.ELEMENT_DATA)
      this.dataSource.paginator = this.paginator
    })
  }

  setPageSizeOptions(setPageSizeOptionsInput: string) 
  {
    if (setPageSizeOptionsInput) this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str)
  }

}
