import { Component , Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UsersService } from 'src/app/services/users/users.service';
import { UsersPageComponent } from 'src/app/components/usersPage/users-page/users-page.component';
import { IUser, IUserIn } from 'src/app/interfaces/IUser';

@Component({
  selector: 'app-dialog-user',
  templateUrl: './dialog-user.component.html',
  styleUrls: ['./dialog-user.component.css']
})
export class DialogUserComponent implements OnInit {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data:any,
    public dialogRef:MatDialogRef<UsersPageComponent>,
    private userService: UsersService,
    private snackBar: MatSnackBar,
    private route:Router
  ) { }

  id!:number
  type!:string
  dialogTitle!:string
  selectedUser!: IUser
  userFormGroup!:FormGroup
  
  roles = 
  [
    { name:"Utilisateur" , value:"user" },
    { name:"Gestionnaire de contenu" , value:"admin" }
  ]

  initFormGroup( type:string )
  {

    if( type === "add" )
    {
      this.userFormGroup = new FormGroup({
        lastNameControl : new FormControl( "" , [Validators.required , Validators.minLength(2)]),
        firstNameControl : new FormControl( "" , [Validators.required , Validators.minLength(2)]),
        phoneNumberControl : new FormControl( "" , [Validators.minLength(10) , Validators.maxLength(20) , Validators.pattern('[- +()0-9]+')]),
        emailControl : new FormControl( "" , [Validators.required]),
        passwordControl : new FormControl( "" , [Validators.required]),
        roleControl : new FormControl( "" , [Validators.required]),
      })
    }
    else
    {
      this.userFormGroup = new FormGroup({
        lastNameControl : new FormControl(),
        firstNameControl : new FormControl(),
        phoneNumberControl : new FormControl(),
        emailControl : new FormControl(),
        passwordControl : new FormControl(),
        roleControl : new FormControl(),
      })
    }
  }

  onNoClick()
  {
    this.dialogRef.close()
  }

  ngOnInit(): void 
  {
    const type = this.data.type

    this.initFormGroup( type )

    if( type === "add" ) this.dialogTitle = "Ajouter utilisateur"
    else
    {
      this.dialogTitle = "Modifier utilisateur"

      this.userService.getUserById(this.data.id).subscribe( (res:IUser) => {
  
        this.selectedUser = res
        this.id = res.id
  
        this.userFormGroup = new FormGroup({
          lastNameControl : new FormControl( res.last_name , [Validators.required , Validators.minLength(2)]),
          firstNameControl : new FormControl( res.first_name , [Validators.required , Validators.minLength(2)]),
          phoneNumberControl : new FormControl( res.phone_number , [Validators.minLength(10) , Validators.maxLength(20) , Validators.pattern('[- +()0-9]+')]),
          emailControl : new FormControl( res.email , [Validators.required]),
          passwordControl : new FormControl( res.password , [Validators.required]),
          roleControl : new FormControl( res.role , [Validators.required]),
        })
      })
    }

  }

  save()
  {
    if( this.userFormGroup.valid === false ) return

    let msg 

    const type = this.data.type

    if( type === "add" ) msg = "Ajouter utilisateur"
    
    if( type === "modif" ) msg = "Modifier utilisateur"

    const form = this.userFormGroup.value

    const user:IUserIn = 
    {
      last_name: form.lastNameControl,
      first_name: form.firstNameControl,
      phone_number: form.phoneNumberControl,
      email: form.emailControl,
      password: form.passwordControl,
      role: form.roleControl,
      receiveEmail: false,
      receiveNotification: false
    }

    const snackBarRef = this.snackBar.open( `Annuler action : ${msg}` , "Undo" , { duration: 3000 } )
    snackBarRef.afterDismissed().subscribe( (e) => {
      
      if( e.dismissedByAction === true )
      {
        this.snackBar.open( "Annulation" , "" , { duration: 3000 } )
        return
      }

      this.userService.addUser(user).subscribe( () => {
        const snackBarRef_ = this.snackBar.open( "Opération terminée" , "" , { duration: 3000 } )
        snackBarRef_.afterDismissed().subscribe(() => {
          this.dialogRef.close()

          let currentUrl = this.route.url;
          this.route.routeReuseStrategy.shouldReuseRoute = () => false;
          this.route.onSameUrlNavigation = 'reload';
          this.route.navigate([currentUrl]);
        })
      })
    })
  }

  getErrorMessage(controlName:string,errorName:string)
  {
    return this.userFormGroup.controls[controlName].hasError(errorName)
  }

}
