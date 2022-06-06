import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { mockRecipe } from 'src/app/mocks/itemMock';
import { RecipesService } from 'src/app/services/recipes/recipes.service';

import { DialogRecipeComponent } from './dialog-recipe.component';

describe('DialogRecipeComponent', () => {
  let component: DialogRecipeComponent
  let fixture: ComponentFixture<DialogRecipeComponent>
  let recipeService:RecipesService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule , MatDialogModule , MatSelectModule , MatFormFieldModule , MatSnackBarModule , MatInputModule , ReactiveFormsModule , FormsModule , HttpClientTestingModule , RouterTestingModule ],
      declarations: [ DialogRecipeComponent ],
      providers: [ RecipesService ,
        {
          provide: MAT_DIALOG_DATA , useValue: { type: "modif" , id: 1 }
        },
        {
          provide: MatDialogRef , useValue: {}
        }
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogRecipeComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    recipeService = TestBed.inject(RecipesService)
  });

  it('should create Dialog Recipe Component', () => {
    expect(component).toBeTruthy()
  })

  
  it('should call ngOnInit', () => {
    spyOn(component,'ngOnInit').and.callThrough()
    const recipeServiceSpy = spyOn(recipeService,'getRecipeById').and.returnValue(of(mockRecipe))

    component.ngOnInit()

    const id = component.data.id 

    recipeService.getRecipeById(id).subscribe( res => {
      expect(res).toBeDefined()
      
      expect(res).toEqual(mockRecipe)
    })

    expect(recipeServiceSpy).toHaveBeenCalled()
  })

  it('should call save method (form valid)', () => {
    spyOn(component,'save').and.callThrough()

    component.recipeFormGroup.get("titleControl")?.setValue("test")
    component.recipeFormGroup.get("prepTimeControl")?.setValue("test")
    component.recipeFormGroup.get("cookingTimeControl")?.setValue("test")
    component.recipeFormGroup.get("restTimeControl")?.setValue("test")
    component.recipeFormGroup.get("categoriesControl")?.setValue("test")
    component.recipeFormGroup.get("ingredientsListControl")?.setValue("test")
    component.recipeFormGroup.get("servingSizeControl")?.setValue("test")
    component.recipeFormGroup.get("instructionsControl")?.setValue("test")

    component.save()

    expect(component.recipeFormGroup.valid).toBeTrue()
    expect(component.save).toHaveBeenCalled()
  })

  it('should call formatString method', () => {
    spyOn(component,'formatString').and.callThrough()

    const string = "test.azerty"

    component.formatString(string)

    expect(component.formatString).toHaveBeenCalled()
  })
});
