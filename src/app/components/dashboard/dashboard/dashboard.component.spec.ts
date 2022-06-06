import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DashboardComponent } from './dashboard.component';
import { IngredientsService } from 'src/app/services/ingredients/ingredients.service';
import { RecipesService } from 'src/app/services/recipes/recipes.service';
import { RootService } from 'src/app/services/root-service/root.service';
import { UsersService } from 'src/app/services/users/users.service';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent
  let fixture: ComponentFixture<DashboardComponent>
  let authService:RootService
  let ingredientService:IngredientsService
  let recipeService:RecipesService
  let userService:UsersService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule , RouterTestingModule ],
      declarations: [ DashboardComponent ],
      providers: [ RootService , IngredientsService , RecipesService , UsersService ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    authService = TestBed.inject(RootService)
    ingredientService = TestBed.inject(IngredientsService)
    recipeService = TestBed.inject(RecipesService)
    userService = TestBed.inject(UsersService)
  });

  it('should create Dashboard component', () => {
    expect(component).toBeTruthy();
  })

  it('should call getIngredientElements method', () => {
    const ingredientServiceSpy = spyOn(ingredientService,'getSizeArrayIngredients').and.returnValue(of(10))

    spyOn(component,'getIngredientElements').and.callThrough()

    component.getIngredientElements()

    ingredientService.getSizeArrayIngredients().subscribe( res => {
      expect(res).toBeDefined()

      expect(res).toEqual(10)
    })

    expect(component.getIngredientElements).toHaveBeenCalled()

    expect(ingredientServiceSpy).toHaveBeenCalled()
  })

  it('should call getRecipeElements method', () => {
    const recipeServiceSpy = spyOn(recipeService,'getSizeArrayRecipes').and.returnValue(of(5))
  
    spyOn(component,'getRecipeElements').and.callThrough()

    component.getRecipeElements()

    recipeService.getSizeArrayRecipes().subscribe( res => {
      expect(res).toBeDefined()
      
      expect(res).toEqual(5)
    })

    expect(component.getRecipeElements).toHaveBeenCalled()

    expect(recipeServiceSpy).toHaveBeenCalled()
  })

  it('should call getUserElements method', () => {
    const userServiceSpy = spyOn(userService,'getSizeArrayUsers').and.returnValue(of(32))
  
    spyOn(component,'getUserElements').and.callThrough()

    component.getUserElements()

    userService.getSizeArrayUsers().subscribe( res => {
      expect(res).toBeDefined()
      
      expect(res).toEqual(32)
    })

    expect(component.getUserElements).toHaveBeenCalled()

    expect(userServiceSpy).toHaveBeenCalled()
  })

  it('should call logout async method', () => {
    const authServiceSpy = spyOn(authService,'logout')
    
    spyOn(component,'logout').and.callThrough()

    component.logout()

    expect(component.logout).toHaveBeenCalled()

    expect(authServiceSpy).toHaveBeenCalled()

  })

});
