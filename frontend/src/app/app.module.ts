import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
// import { MatButtonModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';

import { AppComponent } from './app.component';
import { QuestionComponent } from './question.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { FormsModule,ReactiveFormsModule } from '@angular/forms'
import { HttpClientModule , HTTP_INTERCEPTORS } from '@angular/common/http';

import { ApiService } from './api.service';
import { AuthService } from './auth.service';

import { QuestionsComponent } from './questions.component';
import { HomeComponent } from './home.component';
import { NavComponent } from './nav.component';
import { QuizComponent } from './quiz.component';
import { QuizzesComponent } from './quizzes.component';
import { RegisterComponent } from './register.component';
import { LoginComponent } from './login.component';
import { PlayComponent } from './play.component';

import { AuthInterceptor } from './auth.interceptor';

const routes = [

  {path: '', component: HomeComponent},
  { path: 'question', component: QuestionComponent },
  { path: 'question/:quizId', component: QuestionComponent },
  //{ path: 'questions', component: QuestionsComponent },
  { path: 'register', component: RegisterComponent },
   { path: 'login', component: LoginComponent },
  {path: 'quiz',  component: QuizComponent},

]


@NgModule({
  declarations: [
    AppComponent,
    QuestionComponent,
    QuestionsComponent,
    HomeComponent,
    NavComponent,
    QuizComponent,
    QuizzesComponent,
    RegisterComponent,
    LoginComponent,
    PlayComponent
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    HttpClientModule,
    MatListModule,
    MatToolbarModule,
    ReactiveFormsModule
  ],
  providers: [ApiService, AuthService, {
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
