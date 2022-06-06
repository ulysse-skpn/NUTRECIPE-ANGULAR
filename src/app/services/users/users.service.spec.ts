import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule , HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { UsersService } from './users.service';
import { IUserIn } from 'src/app/interfaces/IUser';


describe('UsersService', () => {
  let userService: UsersService
  let httpMock: HttpTestingController
  let url = 'http://localhost:3000'

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[ RouterTestingModule , HttpClientTestingModule ],
      providers: [ UsersService ]
    })

    userService = TestBed.inject(UsersService)
    httpMock = TestBed.inject(HttpTestingController)
  });

  afterEach( () => {
    httpMock.verify()
  })

  it('UsersService should be created', () => {
    expect(userService).toBeTruthy()
  })

  it('should call getSizeArrayUsers', () => {
    
    userService.getSizeArrayUsers().subscribe()

    const req = httpMock.expectOne(`${url}/users/size`)

    expect(req.request.method).toBe("GET")

    req.flush({})
  })

  it('should call getAllUsers', () => {
    
    const pageSize = 30 , pageIndex = 0

    userService.getAllUsers( pageIndex , pageSize ).subscribe()

    const req = httpMock.expectOne(`${url}/users/pagination`)

    expect(req.request.method).toBe("POST")

    req.flush([pageIndex,pageSize])

  })

  it('should call getUserById', () => {
    
    const id = 3

    userService.getUserById(id).subscribe()

    const req = httpMock.expectOne(`${url}/users/${id}`)

    expect(req.request.method).toBe("GET")

    req.flush(id)

  })

  it('should call addUser', () => {

    const user:IUserIn = 
    {
      last_name: '',
      first_name: '',
      phone_number: '',
      email: '',
      password: '',
      role: '',
      receiveEmail: false,
      receiveNotification: false
    }

    userService.addUser(user).subscribe()

    const req = httpMock.expectOne(`${url}/users`)

    expect(req.request.method).toBe("POST")

    req.flush(user)

  })

  it('should call updateUser', () => {
    
    const id = 5

    const user:IUserIn = 
    {
      last_name: '',
      first_name: '',
      phone_number: '',
      email: '',
      password: '',
      role: '',
      receiveEmail: false,
      receiveNotification: false
    }

    userService.updateUser(user,id).subscribe()

    const req = httpMock.expectOne(`${url}/users/${id}`)

    expect(req.request.method).toBe("PUT")

    req.flush([user,id])

  })

  it('should call deleteUser', () => {

    const id = 5

    userService.deleteUser(id).subscribe()

    const req = httpMock.expectOne(`${url}/users/${id}`)

    expect(req.request.method).toBe("DELETE")

    req.flush(id)

  })

});
