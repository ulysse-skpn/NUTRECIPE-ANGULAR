import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { mockUserInAdmin, mockUserOutAdmin } from 'src/app/mocks/authMock';
import { RootService } from 'src/app/services/root-service/root.service';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent
  let fixture: ComponentFixture<RegisterComponent>
  let authService: RootService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule , RouterTestingModule , ReactiveFormsModule , FormsModule , MatSnackBarModule , BrowserAnimationsModule ],
      declarations: [ RegisterComponent ],
      providers: [ RootService ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    authService = TestBed.inject(RootService)
  });

  it('should create Register Component', () => {
    expect(component).toBeTruthy()
  })

  it('should call onFormSubmit method and form is invalid', () => {
    component.registerFormGroup.get("lastNameControl")?.setValue(null)
    component.registerFormGroup.get("firstNameControl")?.setValue(null)
    component.registerFormGroup.get("phoneNumberControl")?.setValue(null)
    component.registerFormGroup.get("emailControl")?.setValue(null)
    component.registerFormGroup.get("passwordControl")?.setValue(null)

    spyOn(component,'onFormSubmit').and.callThrough()

    component.onFormSubmit()

    expect(component.onFormSubmit).toHaveBeenCalled()
  })

  it('should call onFormSubmit method and form is valid', () => {
    component.registerFormGroup.get("lastNameControl")?.setValue("sekpon")
    component.registerFormGroup.get("firstNameControl")?.setValue("ulysse")
    component.registerFormGroup.get("phoneNumberControl")?.setValue("0102030405")
    component.registerFormGroup.get("emailControl")?.setValue("test@test.com")
    component.registerFormGroup.get("passwordControl")?.setValue("azerty")

    spyOn(sessionStorage,'setItem')
    spyOn(component,'onFormSubmit').and.callThrough()
    const authServiceSpy = spyOn(authService,'register').and.returnValue(of(mockUserOutAdmin))

    component.onFormSubmit()


    authService.register(mockUserInAdmin).subscribe( res => {
      expect(res).toBeDefined()
      expect(res).toEqual(mockUserOutAdmin)

      sessionStorage.setItem("access_token",res.access_token)
      sessionStorage.setItem("expiresIn",res.expires_in.toString())

      expect(sessionStorage.setItem).toHaveBeenCalled()
    })

    expect(authServiceSpy).toHaveBeenCalled()
  })

  it('should call returnToLogin method', () => {
    spyOn(component,'returnToLogin').and.callThrough()

    component.returnToLogin()

    expect(component.returnToLogin).toHaveBeenCalled()
  })
});
