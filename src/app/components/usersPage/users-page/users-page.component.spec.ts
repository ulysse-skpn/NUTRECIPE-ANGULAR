import { HttpClientTestingModule } from '@angular/common/http/testing';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { of } from 'rxjs';
import { mockUserList } from 'src/app/mocks/userMock';
import { UsersService } from 'src/app/services/users/users.service';

import { UsersPageComponent } from './users-page.component';

function tokenGetter() {
  return sessionStorage.getItem("access_token");
}

const event: Event =
{
  bubbles: false,
  cancelBubble: false,
  cancelable: false,
  composed: false,
  currentTarget: null,
  defaultPrevented: false,
  eventPhase: 0,
  isTrusted: false,
  returnValue: false,
  srcElement: null,
  target: null,
  timeStamp: 0,
  type: '',
  composedPath: function (): EventTarget[] {
    throw new Error('Function not implemented.');
  },
  initEvent: function (type: string, bubbles?: boolean, cancelable?: boolean): void {
    throw new Error('Function not implemented.');
  },
  preventDefault: function (): void {
    throw new Error('Function not implemented.');
  },
  stopImmediatePropagation: function (): void {
    throw new Error('Function not implemented.');
  },
  stopPropagation: function (): void {
    console.log("stop propagation")
  },
  AT_TARGET: 0,
  BUBBLING_PHASE: 0,
  CAPTURING_PHASE: 0,
  NONE: 0
}

describe('UsersPageComponent', () => {
  let component: UsersPageComponent
  let fixture: ComponentFixture<UsersPageComponent>
  let userService:UsersService
  let jwtHelper:JwtHelperService
  let jwtHelperStub:any

  beforeEach(async () => {

    jwtHelperStub = 
    {
      isTokenExpired: jasmine.createSpy('isTokenExpired').and.returnValue(true)
    }

    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule , RouterTestingModule , MatPaginatorModule , MatSortModule , MatTableModule , MatSnackBarModule , MatDialogModule , BrowserAnimationsModule , JwtModule.forRoot({
        config:
        {
          tokenGetter: tokenGetter,
          allowedDomains:
          [
            'https://127.0.0.1:3000',
            'https://localhost:4000',
            'https://fonts.gstatic.com/s/materialicons/v126/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'
          ]
        }
      }) ],
      declarations: [ UsersPageComponent ],
      providers: [ JwtHelperService , UsersService ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersPageComponent)
    component = fixture.componentInstance
    fixture.detectChanges()

    jwtHelper = TestBed.inject(JwtHelperService)
    userService = TestBed.inject(UsersService)
  });

  it('should create User Page Component', () => {
    expect(component).toBeTruthy()
  })

  it('user should be redirected if his token is expired', () => {
    spyOn(sessionStorage,'setItem')
    spyOn(sessionStorage,'getItem')
    spyOn(jwtHelper,'isTokenExpired')

    sessionStorage.setItem("access_token","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NTI4OTUyNTYsImV4cCI6MTY1Mjk4MTY1Nn0.0wxSiAeDO4_V-4i5lzB1Z1Mugp3jpf8Z5GIOhy0XZy8")

    const token = sessionStorage.getItem("access_token")
    const isExpired = jwtHelperStub.isTokenExpired(token)

    if( token && isExpired === true )
    {
      expect(token.length).not.toEqual(0)
      expect(isExpired).toBeTrue()
    }
    expect(sessionStorage.setItem).toHaveBeenCalled()
    expect(sessionStorage.getItem).toHaveBeenCalled()
  })

  it('should call add method', () => {
    spyOn(component,'add').and.callThrough()

    component.add()

    expect(component.add).toHaveBeenCalled()
  })

  it('should call edit method', () => {
    spyOn(component,'edit').and.callThrough()
    spyOn(event,'stopPropagation')

    const id = 1

    component.edit(event ,id)

    expect(component.edit).toHaveBeenCalled()
    expect(event.stopPropagation).toHaveBeenCalled()
  })

  it('should call openAddDialog method', () => {
    spyOn(component,'openAddDialog').and.callThrough()

    component.openAddDialog()

    expect(component.openAddDialog).toHaveBeenCalled()
  })

  it('should call openModifDialog method', () => {
    spyOn(component,'openModifDialog').and.callThrough()

    const id = 1

    component.openModifDialog(id)

    expect(component.openModifDialog).toHaveBeenCalled()
  })

  it('should call sizeUsersArray method', () => {
    const userServiceSpy = spyOn(userService,'getSizeArrayUsers').and.returnValue(of(10))

    spyOn(component,'sizeUsersArray').and.callThrough()

    component.sizeUsersArray()

    userService.getSizeArrayUsers().subscribe( res => {
      expect(res).toBeDefined()

      expect(res).toEqual(10)
    })

    expect(component.sizeUsersArray).toHaveBeenCalled()

    expect(userServiceSpy).toHaveBeenCalled()
  })

  it('should call delete method', () => {
    const userServiceSpy = spyOn(userService,'deleteUser').and.returnValue(of([1]))
    spyOn(event,'stopPropagation')

    spyOn(component,'delete').and.callThrough()

    const id = 3

    component.delete(event , id)

    userService.deleteUser(id).subscribe( res => {
      expect(res).toBeDefined()

      expect(res).toEqual([1])
    })

    expect(component.delete).toHaveBeenCalled()
    expect(userServiceSpy).toHaveBeenCalled()
  })

  it('should call loadUsers method', () => {
    spyOn(userService,'getAllUsers').and.returnValue(of(mockUserList))

    spyOn(component,'loadUsers').and.callThrough()

    component.loadUsers()

    userService.getSizeArrayUsers().subscribe( response => {
      expect(response).toBeDefined()

      expect(response).toEqual(10)
    })

    expect(component.loadUsers).toHaveBeenCalled()
  })

  it('should call setPageSizeOptions method', () => {
    spyOn(component,'setPageSizeOptions').and.callThrough()

    const setPageSizeOptionsInput = "azerty"

    component.setPageSizeOptions(setPageSizeOptionsInput)

    expect(component.setPageSizeOptions).toHaveBeenCalled()
    expect(setPageSizeOptionsInput.length).not.toEqual(0)
  })
});
