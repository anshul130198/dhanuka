import { InvalidComponent } from './components/Invalid/invalid.component';
import { ValidComponent } from './components/valid/valid.component';
import { HeaderComponent } from './components/header/header.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LandingComponent } from './components/landing/landing.component';
import { LocationDialogeComponent } from './components/dialog/location/location.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MaterialModule } from './material/material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,
    HeaderComponent,
    ValidComponent,
    InvalidComponent,
    LocationDialogeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  // entryComponents : [LocationDialogeComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
