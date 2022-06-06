import { Component } from '@angular/core';
import { FormControl , Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RootService } from 'src/app/services/root-service/root.service';


@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {

  constructor(
    private route:Router,
    private rootService:RootService
  ) { }

  newPassword = ""
  emailControl = new FormControl("",[Validators.required, Validators.email , Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')])

  getNewPassword()
  {
    const email = 
    {
      email : this.emailControl.value
    }
    this.rootService.forgotPassword(email).subscribe( (res) => {
      this.newPassword = res.newPassword
    })
  }

  returnToLogin():void
  {
    this.route.navigate(["/"])
  }

  getErrorMessage()
  {
    if( this.emailControl.hasError('required')) return "You must enter a value"
    else if( this.emailControl.hasError('pattern') ) return "L'adresse email n'est pas bien formaté"
    return this.emailControl.hasError('email') ? 'Not a valid email' : ""
  }
}
