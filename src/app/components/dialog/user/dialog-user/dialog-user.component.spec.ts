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
import { mockUser } from 'src/app/mocks/userMock';
import { UsersService } from 'src/app/services/users/users.service';

import { DialogUserComponent } from './dialog-user.component';

describe('DialogUserComponent', () => {
  let component: DialogUserComponent
  let fixture: ComponentFixture<DialogUserComponent>
  let userService:UsersService

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BrowserAnimationsModule , MatDialogModule , MatSelectModule , MatFormFieldModule , MatSnackBarModule , MatInputModule , ReactiveFormsModule , FormsModule , HttpClientTestingModule , RouterTestingModule ],
      declarations: [ DialogUserComponent ],
      providers: [ UsersService ,
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
    fixture = TestBed.createComponent(DialogUserComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    userService = TestBed.inject(UsersService)
  });

  it('should create', () => {
    expect(component).toBeTruthy()
  })

  it('should call ngOnInit', () => {
    spyOn(component,'ngOnInit').and.callThrough()
    const userServiceSpy = spyOn(userService,'getUserById').and.returnValue(of(mockUser))

    component.ngOnInit()

    const id = component.data.id 

    userService.getUserById(id).subscribe( res => {
      expect(res).toBeDefined()
      
      expect(res).toEqual(mockUser)
    })

    expect(userServiceSpy).toHaveBeenCalled()
  })

  it('should call save method (form valid)', () => {
    spyOn(component,'save').and.callThrough()

    component.userFormGroup.get("lastNameControl")?.setValue("test")
    component.userFormGroup.get("firstNameControl")?.setValue("test")
    component.userFormGroup.get("phoneNumberControl")?.setValue("test")
    component.userFormGroup.get("emailControl")?.setValue("test")
    component.userFormGroup.get("passwordControl")?.setValue("test")
    component.userFormGroup.get("roleControl")?.setValue("test")
    
    component.save()

    expect(component.save).toHaveBeenCalled()
  })

});
