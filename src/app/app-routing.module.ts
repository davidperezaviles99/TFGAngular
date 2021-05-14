import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomeModule)
  },
  {
    path: 'Profesor',
    loadChildren: () => import('./pages/profesor/profesor.module').then ( m=> m.ProfesorModule)
  },
  {
    path: 'Tutor',
    loadChildren: () => import('./pages/tutor/tutor.module').then ( m=> m.TutorModule)
  },
  {
    path: 'Alumno',
    loadChildren: () => import('./pages/alumno/alumno.module').then ( m=> m.AlumnoModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginModule)
  },
  {
    path: '**',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }