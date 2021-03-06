import { InvalidComponent } from './components/Invalid/invalid.component';
import { ValidComponent } from './components/valid/valid.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';
import { ErrorComponent } from './components/error/error.component';

const routes: Routes = [
  {
    path: 'QRCODE', component: LandingComponent,
    children: [
      {
        path: '',
        redirectTo: 'valid',
        pathMatch: 'full'
      },
      {
        path: '',
        component: ValidComponent
      },
      {
          path: 'invalid',
          component: InvalidComponent
      }
    ]
  },
  {
    path:'Error',
    component: ErrorComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
