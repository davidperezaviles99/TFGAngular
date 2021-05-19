import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from 'src/app/components/components.module';
import { FormsModule } from '@angular/forms';
import { CursoComponent } from './curso.component';
import { CursoRoutingModule } from './curso-routing.module';



@NgModule({
  declarations: [
    CursoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    CursoRoutingModule,
    ComponentsModule
  ]
})
export class CursoModule { }
