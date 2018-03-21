import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from 'angularfire2';

// New imports to update based on AngularFire2 version 4
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';

import { AppComponent } from './app.component';
import { environment } from './../../environments/environment';
import {ModalGalleryModule} from 'angular-modal-gallery';
import { Ng4LoadingSpinnerModule } from 'ng4-loading-spinner';

import { routing } from './app.routing';

import { HomeModule } from './../home/home.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    ModalGalleryModule.forRoot(),
    Ng4LoadingSpinnerModule.forRoot(),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    RouterModule,
    FlashMessagesModule,
    HomeModule,
    routing
  ],
  providers: [FlashMessagesService],
  bootstrap: [AppComponent]
})
export class AppModule { }
