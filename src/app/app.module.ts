import { NgModule } from '@angular/core';
import { FormsModule , ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { RootComponent } from './components/root/root.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { JwtModule } from "@auth0/angular-jwt";

// Angular Material
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input'
import { MatButtonModule } from '@angular/material/button'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator'
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatTooltipModule} from '@angular/material/tooltip'
import {MatSortModule} from '@angular/material/sort'
import {MatSnackBarModule} from '@angular/material/snack-bar'
import {MatDialogModule} from '@angular/material/dialog'
import {MatSelectModule} from '@angular/material/select'

import { AppRoutingModule } from './app-routing.module';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password/forgot-password.component';
import { RegisterComponent } from './components/register/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard/dashboard.component';
import { IngredientsPageComponent } from './components/ingredientsPage/ingredients-page/ingredients-page.component';
import { RecipesPageComponent } from './components/recipesPage/recipes-page/recipes-page.component';
import { UsersPageComponent } from './components/usersPage/users-page/users-page.component';
import { DialogIngredientComponent } from './components/dialog/ingredient/dialog-ingredient/dialog-ingredient.component';
import { DialogUserComponent } from './components/dialog/user/dialog-user/dialog-user.component';
import { DialogRecipeComponent } from './components/dialog/recipe/dialog-recipe/dialog-recipe.component';
import { NotAuthorizedComponent } from './components/not-authorized/not-authorized/not-authorized.component';
import { AuthInterceptor } from './helpers/authconfig.interceptor';

export function tokenGetter() {
  return sessionStorage.getItem("access_token");
}

@NgModule({
  declarations: [
    AppComponent,
    RootComponent,
    ForgotPasswordComponent,
    RegisterComponent,
    DashboardComponent,
    IngredientsPageComponent,
    RecipesPageComponent,
    UsersPageComponent,
    DialogIngredientComponent,
    DialogUserComponent,
    DialogRecipeComponent,
    NotAuthorizedComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    MatTooltipModule,
    MatSortModule,
    MatSnackBarModule,
    MatDialogModule,
    MatSelectModule,
    JwtModule.forRoot({
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
    })
  ],
  providers: 
  [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
