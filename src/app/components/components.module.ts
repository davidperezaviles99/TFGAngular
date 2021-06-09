import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { ProfesorCrudComponent } from './profesor-crud/profesor-crud.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TutorCrudComponent } from './tutor-crud/tutor-crud.component';
import { AlumnoCrudComponent } from './alumno-crud/alumno-crud.component';
import { AsignaturaCrudComponent } from './asignatura-crud/asignatura-crud.component';
import { CursoCrudComponent } from './curso-crud/curso-crud.component';
import { DiarioCrudComponent } from './diario-crud/diario-crud.component';
import { TutorModalComponent } from './tutor-modal/tutor-modal.component';
import { ProfesorModalComponent } from './profesor-modal/profesor-modal.component';
import { EvaluacionCrudComponent } from './evaluacion-crud/evaluacion-crud.component';
import { MensajeCrudComponent } from './mensaje-crud/mensaje-crud.component';
import { ProfileCrudComponent } from './profile-crud/profile-crud.component';

@NgModule({
  declarations: [
    NavbarComponent,
    ProfesorCrudComponent,
    TutorCrudComponent,
    AlumnoCrudComponent,
    AsignaturaCrudComponent,
    CursoCrudComponent,
    DiarioCrudComponent,
    TutorModalComponent,
    ProfesorModalComponent,
    EvaluacionCrudComponent,
    MensajeCrudComponent,
    ProfileCrudComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule
  ],
  exports: [
    NavbarComponent,
    ProfesorCrudComponent,
    TutorCrudComponent,
    AlumnoCrudComponent,
    AsignaturaCrudComponent,
    CursoCrudComponent,
    DiarioCrudComponent,
    TutorModalComponent,
    ProfesorModalComponent,
    EvaluacionCrudComponent,
    MensajeCrudComponent,
    ProfileCrudComponent
  ]
})
export class ComponentsModule { }
