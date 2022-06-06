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
import { mockIngredient } from 'src/app/mocks/itemMock';
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';

import { DialogIngredientComponent } from './dialog-ingredient.component';

describe('DialogIngredientComponent', () => {
  let component: DialogIngredientComponent
  let fixture: ComponentFixture<DialogIngredientComponent>
  let ingredientService:IngredientsService

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule , MatDialogModule , MatSelectModule , MatFormFieldModule , MatSnackBarModule , MatInputModule , ReactiveFormsModule , FormsModule , HttpClientTestingModule , RouterTestingModule ],
      declarations: [ DialogIngredientComponent ],
      providers: [ IngredientsService ,
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
    fixture = TestBed.createComponent(DialogIngredientComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    ingredientService = TestBed.inject(IngredientsService)
  });

  it('should create Dialog Ingredient Component', () => {
    expect(component).toBeTruthy()
  })

  it('should call ngOnInit', () => {
    spyOn(component,'ngOnInit').and.callThrough()
    const ingredientServiceSpy = spyOn(ingredientService,'getIngredientById').and.returnValue(of(mockIngredient))

    component.ngOnInit()

    const id = component.data.id 

    ingredientService.getIngredientById(id).subscribe( res => {
      expect(res).toBeDefined()
      
      expect(res).toEqual(mockIngredient)
    })

    expect(ingredientServiceSpy).toHaveBeenCalled()
  })

  it('should call save method (form valid)', () => {
    spyOn(component,'save').and.callThrough()

    component.ingredientFormGroup.get("productNameControl")?.setValue("test")
    component.ingredientFormGroup.get("ingredientTextControl")?.setValue("azerty")
    component.ingredientFormGroup.get("carbohydratesControl")?.setValue(10)
    component.ingredientFormGroup.get("proteinsControl")?.setValue(10)
    component.ingredientFormGroup.get("fatsControl")?.setValue(10)
    component.ingredientFormGroup.get("saltControl")?.setValue(10)
    component.ingredientFormGroup.get("caloriesControl")?.setValue(10)
    component.ingredientFormGroup.get("novaGroupControl")?.setValue(1)
    component.ingredientFormGroup.get("servingSizeControl")?.setValue("30g")
    component.ingredientFormGroup.get("categoriesControl")?.setValue("categories test")

    component.save()

    const form = component.ingredientFormGroup.value
    
    if( form.ingredientTextControl != null )
    {
      expect(form.ingredientTextControl).not.toEqual(null)
    }

    expect(component.save).toHaveBeenCalled()
  })

  it('should call formatString method', () => {
    spyOn(component,'formatString').and.callThrough()

    const string = "test.azerty"

    component.formatString(string)

    expect(component.formatString).toHaveBeenCalled()
  })


});
