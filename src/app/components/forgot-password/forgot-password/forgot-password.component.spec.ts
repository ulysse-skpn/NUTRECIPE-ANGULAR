import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { RootService } from 'src/app/services/root-service/root.service';

import { ForgotPasswordComponent } from './forgot-password.component';

import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { of } from 'rxjs';


describe('ForgotPasswordComponent', () => {
  let component: ForgotPasswordComponent
  let fixture: ComponentFixture<ForgotPasswordComponent>
  let authService:RootService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule , RouterTestingModule , ReactiveFormsModule , FormsModule ],
      declarations: [ ForgotPasswordComponent ],
      providers: [ RootService ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ForgotPasswordComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    authService = TestBed.inject(RootService)
  });

  it('should create Forgot Password Component', () => {
    expect(component).toBeTruthy()
  })

  it('should call getNewPassword method', () => {
    const authServiceSpy = spyOn(authService,'forgotPassword').and.returnValue(of("new_password"))
    
    spyOn(component,'getNewPassword').and.callThrough()

    component.getNewPassword()

    const email = { email:"test@test.com" }

    authService.forgotPassword(email).subscribe( res => {
      expect(res).toBeDefined()
      
      expect(res).toEqual("new_password")
    })

    expect(component.getNewPassword).toHaveBeenCalled()

    expect(authServiceSpy).toHaveBeenCalled()
  })

  it('should call returnToLogin method', () => {
    spyOn(component,'returnToLogin').and.callThrough()

    component.returnToLogin()

    expect(component.returnToLogin).toHaveBeenCalled()
  })

  it('should call getErrorMessage method (pattern)', () => {
    component.emailControl.setValue("test")
    spyOn(component,'getErrorMessage').and.callThrough()

    component.getErrorMessage()

    expect(component.emailControl.hasError('pattern')).toBeTrue()
    expect(component.getErrorMessage).toHaveBeenCalled()
  })

  it('should call getErrorMessage method (email)', () => {
    component.emailControl.setValue("test@.com")
    spyOn(component,'getErrorMessage').and.callThrough()

    component.getErrorMessage()

    expect(component.emailControl.hasError('email')).toBeTrue()
    expect(component.getErrorMessage).toHaveBeenCalled()
  })

  it('should call getErrorMessage method but return empty string because the form is valid', () => {
    component.emailControl.setValue("test@test.com")
    spyOn(component,'getErrorMessage').and.callThrough()

    component.getErrorMessage()

    expect(component.getErrorMessage).toHaveBeenCalled()
    expect(component.getErrorMessage()).toEqual("")
  })
});
