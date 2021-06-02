import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfesorGuard } from './guards/profesor.guard';

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
    path: 'Mensaje',
    loadChildren: () => import('./pages/mensaje/mensaje.module').then( m => m.MensajeModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfileModule)
  },
  {
    canActivate: [ProfesorGuard],
    path: 'Profesor',
    loadChildren: () => import('./pages/profesor/profesor.module').then ( m=> m.ProfesorModule)
  },
  {
    canActivate: [ProfesorGuard],
    path: 'Tutor',
    loadChildren: () => import('./pages/tutor/tutor.module').then ( m=> m.TutorModule)
  },
  {
    canActivate: [ProfesorGuard],
    path: 'Alumno',
    loadChildren: () => import('./pages/alumno/alumno.module').then ( m=> m.AlumnoModule)
  },
  {
    canActivate: [ProfesorGuard],
    path: 'Asignatura',
    loadChildren: () => import('./pages/asignatura/asignatura.module').then ( m=> m.AsignaturaModule)
  },
  {
    canActivate: [ProfesorGuard],
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