import { Component } from '@angular/core';
import { FormControl , FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ICredentialsIn } from 'src/app/interfaces/ICredentials';
import { IUserOut } from 'src/app/interfaces/IUser';
import { RootService } from 'src/app/services/root-service/root.service';

@Component({
  selector: 'app-root-nutrecipe',
  templateUrl: './root.component.html',
  styleUrls: ['./root.component.css']
})
export class RootComponent {

  constructor(
    private rootService:RootService,
    private route:Router
  ) { }
  
  hide = true

  loginFormGroup = new FormGroup({
    emailControl : new FormControl("",[Validators.required, Validators.email , Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$') ]),
    passwordControl : new FormControl("",[Validators.required, Validators.minLength(6) ])
  })
  
  login()
  {
    if( this.loginFormGroup.valid === false ) return

    const form = this.loginFormGroup.value

    const credentials:ICredentialsIn =
    {
      email:form.emailControl,
      password:form.passwordControl
    }

    this.rootService.login(credentials).subscribe( (res:IUserOut) => {

      if( res.user.role !== "admin" ) 
      {
        window.alert("Vous n'avez pas les droits pour vous connecter à l'application")
        return
      }

      const nameUser = `${res.user.last_name.toLocaleUpperCase()} ${ res.user.first_name.charAt(0).toLocaleUpperCase() + res.user.first_name.slice(1) }`

      sessionStorage.setItem( "nameUser" , nameUser )
      sessionStorage.setItem( "access_token" , res.access_token )
      sessionStorage.setItem( "expiresIn" , res.expires_in.toString() )
      
      this.route.routeReuseStrategy.shouldReuseRoute = () => false;
      this.route.onSameUrlNavigation = 'reload';
      this.route.navigate(["/dashboard"]);
    })
  }


  register():void
  {
    this.route.navigate(["/","register"])
  }

  forgotPassword():void
  {
    this.route.navigate(["/","forgotPassword"])
  }

  getErrorMessage(controlName:string,errorName:string)
  {
    return this.loginFormGroup.controls[controlName].hasError(errorName)
  }

}