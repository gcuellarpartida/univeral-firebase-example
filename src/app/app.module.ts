import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlexLayoutModule } from '@angular/flex-layout';
import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { MaterialModule } from './material.module';
import { HttpModule } from '@angular/http';
import { environment } from '../environments/environment';
import { HttpClientModule } from '@angular/common/http';
import { TransferHttpCacheModule} from '@nguniversal/common';

import { AppComponent } from './app.component';
import { AuthService } from './services/auth.service';
import { LoginSignupComponent } from './login-signup/login-signup.component';
import { TestApiComponent } from './test-api/test-api.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginSignupComponent,
    TestApiComponent
  ],
  imports: [
    BrowserModule.withServerTransition({appId: 'example'}),
    FormsModule,
    BrowserAnimationsModule,
    FlexLayoutModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    MaterialModule,
    ReactiveFormsModule,
    HttpModule,
    HttpClientModule,
    TransferHttpCacheModule,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
