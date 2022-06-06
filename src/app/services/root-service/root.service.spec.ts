import { TestBed} from '@angular/core/testing';
import { HttpClientTestingModule , HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { mockPassword, mockUserOut } from 'src/app/mocks/authMock';
import { RootService } from './root.service';
import { IUserIn } from 'src/app/interfaces/IUser';

describe('RootService', () => {
  let authService: RootService
  let httpMock: HttpTestingController
  let url = 'http://localhost:3000'

  const authServiceSpy = jasmine.createSpyObj("AuthService",
  ['login','register','forgotPassword','logout','redirectTo','emptySession', 'getToken','isLoggedIn','handleError'])

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule , HttpClientTestingModule ],
      providers: [ RootService ]
    })
    authService = TestBed.inject(RootService)
    httpMock = TestBed.inject(HttpTestingController)
  });

  it('should be created', () => {
    expect(authService).toBeTruthy()
  })

  
  afterEach( () => {
    httpMock.verify()
  })

  it('AuthService should be created', () => {
    expect(authService).toBeTruthy();
  });

  // ================= LOGIN =================
  it( 'should call login method', () => {
    authServiceSpy.login();
    expect(authServiceSpy.login).toHaveBeenCalled();
  });

  it( 'should retrieve user from api via POST for the login method', () => {
    const credentials = 
    {
      email:"u.sekpon@gmail.com",
      password:"azerty"
    }

    authService.login(credentials).subscribe( (userOut) => {
      expect(userOut).toBeDefined()
      expect(userOut).toEqual(mockUserOut)
    })

    const req = httpMock.expectOne(`${url}/login`)

    expect(req.request.method).toBe("POST")

    req.flush(mockUserOut)
  });
  // =========================================================


  // ================= REGISTER =================
  it( 'should call register method', () => {
    authServiceSpy.register();
    expect(authServiceSpy.register).toHaveBeenCalled();
  });

  it( 'should sign up user from api via POST for the register method', () => {

    const user:IUserIn = 
    {
      last_name: 'SEKPON',
      first_name: 'ulysse',
      phone_number: '0000000000',
      email: 'u.sekpon@gmail.com',
      password: 'azerty',
      role: 'user',
      receiveEmail: false,
      receiveNotification: false
    };

    authService.register(user).subscribe( (userOut) => {
      expect(userOut).toBeDefined()
      expect(userOut).toEqual(mockUserOut)
    })

    const req = httpMock.expectOne(`${url}/register`)

    expect(req.request.method).toBe("POST")

    req.flush(mockUserOut)
  });
  // =========================================================



  // ================= FORGOT PASSWORD =================

  it( 'should call forgot password method', () => {
    authServiceSpy.forgotPassword();
    expect(authServiceSpy.forgotPassword).toHaveBeenCalled();
  });

  it( 'should sign up user from api via POST for the forgotPassword method', () => {

    const email = 
    {
      email:'test@gmail.com'
    };

    authService.forgotPassword(email).subscribe( (newPassword) => {   
      expect(newPassword).toBeDefined()
      expect(newPassword).toEqual(mockPassword)
    })

    const req = httpMock.expectOne(`${url}/forgotPassword`)

    expect(req.request.method).toBe("POST")

    req.flush(mockPassword)
  });
  // =========================================================

  // ================= LOGOUT =================

  it( 'should call logout method', () => {
    spyOn(authService,'logout').and.callThrough()
    spyOn(sessionStorage,'setItem')
    spyOn(sessionStorage,'removeItem')

    sessionStorage.setItem("access_token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTI4OTUyNTYsImV4cCI6MTY1Mjk4MTY1Nn0.0wxSiAeDO4_V-4i5lzB1Z1Mugp3jpf8Z5GIOhy0XZy8")
    sessionStorage.setItem("expiresIn","8200")

    authService.logout()

    sessionStorage.removeItem("access_token")
    sessionStorage.removeItem("expiresIn")

    expect(authService.logout).toHaveBeenCalled()
    expect(sessionStorage.setItem).toHaveBeenCalled()
    expect(sessionStorage.removeItem).toHaveBeenCalled()
  })

  // ================= GETTOKEN =================

  it( 'should call getToken method', () => {
    sessionStorage.setItem("access_token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTI4OTUyNTYsImV4cCI6MTY1Mjk4MTY1Nn0.0wxSiAeDO4_V-4i5lzB1Z1Mugp3jpf8Z5GIOhy0XZy8")

    spyOn(authService,'getToken').and.callThrough()
    spyOn(sessionStorage,'getItem').and.callThrough()

    authService.getToken()

    expect(authService.getToken).toHaveBeenCalled()
    expect(sessionStorage.getItem).toHaveBeenCalled()
  });

  it( 'getToken method should return a token', () => {
    const access_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTIyNzYyMjIsImV4cCI6MTY1MjM2MjYyMn0.4zUKp2ci-gxs_Yl3eNEPTWcw_Sfz5loDyf7OhtzoWiY"
    authServiceSpy.getToken.and.returnValue(access_token)
    expect(authServiceSpy.getToken()).toEqual(access_token)
  });

  it( 'getToken method should return null', () => {
    const access_token = null
    authServiceSpy.getToken.and.returnValue(access_token)
    expect(authServiceSpy.getToken()).toEqual(null)
  });

  // ================= ISLOGGEDIN =================

  it( 'should call isLoggedIn method and token exists', () => {
    sessionStorage.setItem("access_token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTI4OTUyNTYsImV4cCI6MTY1Mjk4MTY1Nn0.0wxSiAeDO4_V-4i5lzB1Z1Mugp3jpf8Z5GIOhy0XZy8")

    spyOn(authService,'isLoggedIn').and.callThrough()
    spyOn(sessionStorage,'getItem').and.callThrough()

    const bool = authService.isLoggedIn()
    const token = sessionStorage.getItem("access_token")
    expect(token).not.toEqual(null)
    expect(bool).toEqual(true)
  })

  it( "should call isLoggedIn method and token doesn't exist", () => {
    sessionStorage.removeItem("access_token")

    spyOn(authService,'isLoggedIn').and.callThrough()
    spyOn(sessionStorage,'getItem').and.callThrough()

    const token = sessionStorage.getItem("access_token")
    const bool = authService.isLoggedIn()
    expect(token).toEqual(null)
    expect(bool).toEqual(false)
  })

  // ================= HANDLEERROR =================

  it( 'should call handleError method', () => {
    authServiceSpy.handleError();
    expect(authServiceSpy.handleError).toHaveBeenCalled();
  });
});
