import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { ICredentialsIn } from 'src/app/interfaces/ICredentials';
import { mockUserOut, mockUserOutAdmin } from 'src/app/mocks/authMock';
import { RootService } from 'src/app/services/root-service/root.service';
import { DashboardComponent } from '../dashboard/dashboard/dashboard.component';
import { ForgotPasswordComponent } from '../forgot-password/forgot-password/forgot-password.component';
import { RegisterComponent } from '../register/register/register.component';

import { RootComponent } from './root.component';


describe('RootComponent', () => {
  let component: RootComponent
  let fixture: ComponentFixture<RootComponent>
  let authService:RootService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule , RouterTestingModule.withRoutes([
        {
          path:"register" , component: RegisterComponent
        },
        {
          path: "forgotPassword" , component : ForgotPasswordComponent
        },
        {
          path: "dashboard" , component: DashboardComponent
        }
      ]) , ReactiveFormsModule , FormsModule ],
      declarations: [ RootComponent ],
      providers: [RootService],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RootComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    authService = TestBed.inject(RootService)
  });

  it('should create Root Component', () => {
    expect(component).toBeTruthy()
  })

  it('should call login method but form is invalid', () => {
    component.loginFormGroup.get("emailControl")?.setValue(null)
    component.loginFormGroup.get("passwordControl")?.setValue(null)

    spyOn(component,'login').and.callThrough()

    component.login()

    expect(component.login).toHaveBeenCalled()
    expect(component.loginFormGroup.valid).toBeFalse()
  })

  it('should call login method and form is valid', () => {
    component.loginFormGroup.get("emailControl")?.setValue("test@test.com")
    component.loginFormGroup.get("passwordControl")?.setValue("azerty")

    const authServiceSpy = spyOn(authService,'login').and.returnValue(of(mockUserOutAdmin))

    spyOn(sessionStorage,'setItem')
    spyOn(component,'login').and.callThrough()

    component.login()

    const credentials:ICredentialsIn =
    {
      email:"test@test.com",
      password:"azerty"
    }

    authService.login(credentials).subscribe( res => {
      expect(res).toBeDefined()

      expect(res).toEqual(mockUserOutAdmin)

      sessionStorage.setItem("access_token",res.access_token)
      sessionStorage.setItem("expiresIn",res.expires_in.toString())

      expect(sessionStorage.setItem).toHaveBeenCalled()
    })

    expect(component.login).toHaveBeenCalled()
    expect(component.loginFormGroup.valid).toBeTrue()

    expect(authServiceSpy).toHaveBeenCalled()
  })

  it('should call login method , form is valid but the user role is not admin', () => {
    component.loginFormGroup.get("emailControl")?.setValue("test@test.com")
    component.loginFormGroup.get("passwordControl")?.setValue("azerty")

    spyOn(authService,'login').and.returnValue(of(mockUserOut))

    spyOn(component,'login').and.callThrough()

    component.login()

    const credentials:ICredentialsIn =
    {
      email:"test@test.com",
      password:"azerty"
    }

    authService.login(credentials).subscribe( res => {
      expect(res).toEqual(mockUserOut)
    })
  })

  it('should call register method', () => {
    spyOn(component,'register').and.callThrough()

    component.register()

    expect(component.register).toHaveBeenCalled()
  })

  it('should call forgotPassword method', () => {
    spyOn(component,'forgotPassword').and.callThrough()

    component.forgotPassword()

    expect(component.forgotPassword).toHaveBeenCalled()
  })
});
