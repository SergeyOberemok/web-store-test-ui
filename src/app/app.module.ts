import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { CoreModule } from './core/core.module';
import { ReactiveFormsModule } from '@angular/forms';
import { StoreModule } from './store/store.module';
import { HttpClientModule } from '@angular/common/http';
import { API_URLS } from './core/shared';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    ReactiveFormsModule,
    StoreModule,
    HttpClientModule,
  ],
  providers: [
    {
      provide: 'URLS',
      useValue: API_URLS,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
