import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule , HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { IngredientsService } from './ingredients.service';
import { IIngredientIn } from 'src/app/interfaces/IIngredient';

describe('IngredientsService', () => {
  let ingredientService: IngredientsService
  let httpMock: HttpTestingController
  let url = 'http://localhost:3000'

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule , HttpClientTestingModule ],
      providers: [ IngredientsService ]
    })

    ingredientService = TestBed.inject(IngredientsService)
    httpMock = TestBed.inject(HttpTestingController)
  })

  afterEach( () => {
    httpMock.verify()
  })

  it('IngredientService should be created', () => {
    expect(ingredientService).toBeTruthy()
  })

  it('should call getSizeArrayIngredients', () => {

    ingredientService.getSizeArrayIngredients().subscribe()

    const req = httpMock.expectOne(`${url}/ingredients/size`)

    expect(req.request.method).toBe("GET")

    req.flush({})

  })

  it('should call getAllIngredients', () => {

    const pageSize = 30 , pageIndex = 0

    ingredientService.getAllIngredients( pageIndex , pageSize ).subscribe()

    const req = httpMock.expectOne(`${url}/ingredients/pagination`)

    expect(req.request.method).toBe("POST")

    req.flush([pageIndex,pageSize])

  })

  it('should call getIngredientById', () => {

    const id = 3

    ingredientService.getIngredientById(id).subscribe()

    const req = httpMock.expectOne(`${url}/ingredients/${id}`)

    expect(req.request.method).toBe("GET")

    req.flush(id)

  })

  it('should call addIngredient', () => {

    const ingredient:IIngredientIn = 
    {
      product_name: '',
      ingredient_text: '',
      carbohydrates: 0,
      proteins: 0,
      fats: 0,
      salt: 0,
      calories: 0,
      nova_group: 3,
      categories: '',
      serving_size: '',
      image: ''
    }

    ingredientService.addIngredient(ingredient).subscribe()

    const req = httpMock.expectOne(`${url}/ingredients`)

    expect(req.request.method).toBe("POST")

    req.flush(ingredient)

  })

  it('should call updateIngredient', () => {

    const id = 3
    
    const ingredient:IIngredientIn = 
    {
      product_name: '',
      ingredient_text: '',
      carbohydrates: 0,
      proteins: 0,
      fats: 0,
      salt: 0,
      calories: 0,
      nova_group: 3,
      categories: '',
      serving_size: '',
      image: ''
    }

    ingredientService.updateIngredient(ingredient,id).subscribe()

    const req = httpMock.expectOne(`${url}/ingredients/${id}`)

    expect(req.request.method).toBe("PUT")

    req.flush([ingredient,id])

  })

  it('should call deleteIngredient', () => {

    const id = 3

    ingredientService.deleteIngredient(id).subscribe()

    const req = httpMock.expectOne(`${url}/ingredients/${id}`)

    expect(req.request.method).toBe("DELETE")

    req.flush(id)

  })
});
