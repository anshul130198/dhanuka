import { InvalidComponent } from './components/Invalid/invalid.component';
import { ValidComponent } from './components/valid/valid.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LandingComponent } from './components/landing/landing.component';

const routes: Routes = [
  {
    path: '', component: LandingComponent,
    children: [
      {
        path: '',
        redirectTo: 'valid',
        pathMatch: 'full'
      },
      {
        path: 'valid',
        component: ValidComponent
      },
      {
          path: 'invalid',
          component: InvalidComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
