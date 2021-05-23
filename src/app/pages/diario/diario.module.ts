import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiarioComponent } from './diario.component';
import { FormsModule } from '@angular/forms';
import { DiarioRoutingModule } from './diario-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';
import { EvaluacionCrudComponent } from 'src/app/components/evaluacion-crud/evaluacion-crud.component';



@NgModule({
  declarations: [
    DiarioComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    DiarioRoutingModule,
    ComponentsModule
  ]
})
export class DiarioModule { }
