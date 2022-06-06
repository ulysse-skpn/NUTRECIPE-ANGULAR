import { Component } from '@angular/core';
import { FormControl , FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { IUserIn } from 'src/app/interfaces/IUser';
import { RootService } from 'src/app/services/root-service/root.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  constructor(
    private route:Router,
    private rootService:RootService,
    private snackBar:MatSnackBar
  ) { }

  hide:boolean = true

  registerFormGroup = new FormGroup({
    lastNameControl:  new FormControl( "" , [ Validators.required , Validators.minLength(1) ]),
    firstNameControl:  new FormControl( "" , [ Validators.required , Validators.minLength(1) ]),
    phoneNumberControl:  new FormControl( null , [ Validators.minLength(10) , Validators.maxLength(20)  ]),
    emailControl:  new FormControl( "" , [ Validators.required , Validators.email , Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]),
    passwordControl:  new FormControl( "" , [ Validators.required , Validators.minLength(6) ])
  })
  

  returnToLogin():void
  {
    this.route.navigate(["/"])
  }

  onFormSubmit()
  {
    if( this.registerFormGroup.valid === false ) return

    const form = this.registerFormGroup.value


    const phone_number = form.phoneNumberControl.length === 0 ? null : form.phoneNumberControl
    const userIn:IUserIn =
    {
      last_name: form.lastNameControl,
      first_name: form.firstNameControl,
      phone_number: phone_number,
      email: form.emailControl,
      password: form.passwordControl,
      role: "admin",
      receiveEmail: false,
      receiveNotification: false
    }

    this.rootService.register(userIn).subscribe( (res) => {

      sessionStorage.setItem( "access_token" , res.access_token )
      sessionStorage.setItem( "expiresIn" , res.expires_in.toString() )

      const snackBarRef = this.snackBar.open("Utilisateur enregistré , vous allez être redirigé vers la page de connexion" , "" , {
        duration: 3200
      })

      snackBarRef.afterDismissed().subscribe( () => {

        this.route.routeReuseStrategy.shouldReuseRoute = () => false;

        this.route.onSameUrlNavigation = 'reload';

        this.route.navigate(["/"]);

      })
    })
  }

  getErrorMessage(controlName:string,errorName:string)
  {
    return this.registerFormGroup.controls[controlName].hasError(errorName)
  }
}
