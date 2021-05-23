import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./pages/home/home.module').then( m => m.HomeModule)
  },
  {
    path: 'Diario',
    loadChildren: () => import('./pages/diario/diario.module').then( m => m.DiarioModule)
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
    path: 'Asignatura',
    loadChildren: () => import('./pages/asignatura/asignatura.module').then ( m=> m.AsignaturaModule)
  },
  {
    path: 'Curso',
    loadChildren: () => import('./pages/curso/curso.module').then ( m=> m.CursoModule)
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