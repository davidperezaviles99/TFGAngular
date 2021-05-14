import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfesorComponent } from './profesor.component';
import { FormsModule } from '@angular/forms';
import { ProfesorRoutingModule } from './profesor-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    ProfesorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ProfesorRoutingModule,
    ComponentsModule
  ]
})
export class ProfesorModule { }
