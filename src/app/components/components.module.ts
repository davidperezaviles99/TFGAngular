import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { NavbarComponent } from './navbar/navbar.component';
import { ProfesorCrudComponent } from './profesor-crud/profesor-crud.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TutorCrudComponent } from './tutor-crud/tutor-crud.component';
import { AlumnoCrudComponent } from './alumno-crud/alumno-crud.component';



@NgModule({
  declarations: [
    NavbarComponent,
    ProfesorCrudComponent,
    TutorCrudComponent,
    AlumnoCrudComponent
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
  ]
})
export class ComponentsModule { }
