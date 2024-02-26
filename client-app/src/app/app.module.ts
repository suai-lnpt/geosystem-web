import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import{ HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http'
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AboutPageComponent } from './about-page/about-page.component';
import { ProjectsPageComponent } from './projects-page/projects-page.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { AuthLayoutComponent } from './shared/layouts/auth-layout/auth-layout.component';
import { WebappLayoutComponent } from './shared/layouts/webapp-layout/webapp-layout.component';
import { RegisterPageComponent } from './register-page/register-page.component';
import { MapPageComponent } from './webapp/map-page/map-page.component';
import { ProfilePageComponent } from './profile/profile-page/profile-page.component';
import { ComplexPageComponent } from './projects-page/complex-page/complex-page.component';
import { WebappDescriptionPageComponent } from './projects-page/webapp-description-page/webapp-description-page.component';
import { HomeappComponent } from './webapp/homeapp/homeapp.component';
import { ProcessMediaPageComponent } from './webapp/process-media-page/process-media-page.component';

import { AuthGuard } from './shared/middlewares/authGuard';
import { AuthFizGuard } from './shared/middlewares/authFizGuard';
import { TokenInterceptor } from './shared/middlewares/token.interceptor';

const appRoutes: Routes = [
  {path: '', component: AuthLayoutComponent, children:[
    {path: '', component: HomePageComponent},
    {path: 'about', component: AboutPageComponent},
    {path: 'projects/complex', component: ComplexPageComponent},
    {path: 'projects/webapp', component: WebappDescriptionPageComponent},
    {path: 'login', component: AuthPageComponent},
    {path: 'register', component: RegisterPageComponent},
    {path: 'profile', canActivate: [AuthGuard], component: ProfilePageComponent},
  ]},
  {path: 'webapp', component: WebappLayoutComponent, canActivate: [AuthGuard, AuthFizGuard], children:[
    {path: 'home-app', component: HomeappComponent},
    {path: 'map-page', component: MapPageComponent},
    {path: 'process-media-page', component: ProcessMediaPageComponent},
  ]}
]

@NgModule({
  declarations: [
    AppComponent,
    AuthLayoutComponent,
    WebappLayoutComponent,
    HomePageComponent,
    AboutPageComponent,
    ProjectsPageComponent,
    AuthPageComponent,
    RegisterPageComponent,
    MapPageComponent,
    ProfilePageComponent,
    ComplexPageComponent,
    WebappDescriptionPageComponent,
    HomeappComponent,
    ProcessMediaPageComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      multi: true,
      useClass: TokenInterceptor
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
