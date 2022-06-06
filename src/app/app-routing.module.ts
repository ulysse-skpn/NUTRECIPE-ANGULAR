import { NgModule } from '@angular/core';
import { RouterModule , Routes } from '@angular/router'
import { CommonModule } from '@angular/common';
import { RootComponent } from './components/root/root.component';
import { RegisterComponent } from './components/register/register/register.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password/forgot-password.component';
import { UsersPageComponent } from './components/usersPage/users-page/users-page.component';
import { RecipesPageComponent } from './components/recipesPage/recipes-page/recipes-page.component';
import { IngredientsPageComponent } from './components/ingredientsPage/ingredients-page/ingredients-page.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { RouteGuard } from './services/route-guard/route.guard';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized/not-authorized.component';

const routes:Routes = 
[
  { path: "" , component : RootComponent },
  { path: "register" , component : RegisterComponent},
  { path: "forgotPassword" , component : ForgotPasswordComponent},
  
  
  { path: "dashboard" , component : DashboardComponent},
  { path: "users" , component : UsersPageComponent , canActivate:[RouteGuard]},
  { path: "recipes" , component : RecipesPageComponent , canActivate:[RouteGuard]},
  { path: "ingredients" , component : IngredientsPageComponent , canActivate:[RouteGuard]},

  { path: "notauthorized" , component: NotAuthorizedComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes , {onSameUrlNavigation: 'reload'} )
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
