import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule , HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RecipesService } from './recipes.service';
import { IRecipeIn } from 'src/app/interfaces/IRecipe';


describe('RecipesService', () => {
  let recipeService: RecipesService
  let httpMock: HttpTestingController
  let url = 'http://localhost:3000'

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule , HttpClientTestingModule ],
      providers: [ RecipesService ]
    })

    recipeService = TestBed.inject(RecipesService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach( () => {
    httpMock.verify()
  })

  it('RecipeService should be created', () => {
    expect(recipeService).toBeTruthy()
  })

  
  it('should call getSizeArrayRecipes', () => {

    recipeService.getSizeArrayRecipes().subscribe()

    const req = httpMock.expectOne(`${url}/recipes/size`)

    expect(req.request.method).toBe("GET")

    req.flush({})

  })

  it('should call getAllRecipes', () => {

    const pageSize = 30 , pageIndex = 0

    recipeService.getAllRecipes( pageIndex , pageSize ).subscribe()

    const req = httpMock.expectOne(`${url}/recipes/pagination`)

    expect(req.request.method).toBe("POST")

    req.flush([pageIndex,pageSize])

  })

  it('should call getRecipeById', () => {

    const id = 3

    recipeService.getRecipeById(id).subscribe()

    const req = httpMock.expectOne(`${url}/recipes/${id}`)

    expect(req.request.method).toBe("GET")

    req.flush(id)

  })

  it('should call addRecipe', () => {

    const recipe:IRecipeIn = 
    {
      title: '',
      prep_time: '',
      cooking_time: '',
      rest_time: '',
      categories: '',
      ingredients_list: '',
      serving_size: '',
      instructions: '',
      image: ''
    }

    recipeService.addRecipe(recipe).subscribe()

    const req = httpMock.expectOne(`${url}/recipes`)

    expect(req.request.method).toBe("POST")

    req.flush(recipe)

  })

  it('should call updateRecipe', () => {

    const id = 3
    
    const recipe:IRecipeIn = 
    {
      title: '',
      prep_time: '',
      cooking_time: '',
      rest_time: '',
      categories: '',
      ingredients_list: '',
      serving_size: '',
      instructions: '',
      image: ''
    }

    recipeService.updateRecipe(recipe,id).subscribe()

    const req = httpMock.expectOne(`${url}/recipes/${id}`)

    expect(req.request.method).toBe("PUT")

    req.flush([recipe,id])

  })

  it('should call deleteRecipe', () => {

    const id = 3

    recipeService.deleteRecipe(id).subscribe()

    const req = httpMock.expectOne(`${url}/recipes/${id}`)

    expect(req.request.method).toBe("DELETE")

    req.flush(id)

  })
});
