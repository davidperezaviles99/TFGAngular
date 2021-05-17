import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { ProfesorCrudComponent } from './profesor-crud/profesor-crud.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TutorCrudComponent } from './tutor-crud/tutor-crud.component';
import { AlumnoCrudComponent } from './alumno-crud/alumno-crud.component';
import { TutorModalComponent } from './tutor-modal/tutor-modal.component';
import { ProfesorModalComponent } from './profesor-modal/profesor-modal.component';



@NgModule({
  declarations: [
    NavbarComponent,
    ProfesorCrudComponent,
    TutorCrudComponent,
    AlumnoCrudComponent,
    TutorModalComponent,
    ProfesorModalComponent
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
    TutorModalComponent,
    ProfesorModalComponent
  ]
})
export class ComponentsModule { }
