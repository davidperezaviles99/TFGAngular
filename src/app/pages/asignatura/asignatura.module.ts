import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AsignaturaComponent } from './asignatura.component';
import { AsignaturaRoutingModule } from './asignatura-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AsignaturaComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AsignaturaRoutingModule,
    ComponentsModule
  ]
})
export class AsignaturaModule { }
