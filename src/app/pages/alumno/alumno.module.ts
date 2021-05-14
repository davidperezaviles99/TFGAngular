import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlumnoComponent } from './alumno.component';
import { AlumnoRoutingModule } from './alumno-routing.module';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';


@NgModule({
  declarations: [
    AlumnoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AlumnoRoutingModule,
    ComponentsModule
  ]
})
export class AlumnoModule { }
