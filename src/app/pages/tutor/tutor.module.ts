import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TutorComponent } from './tutor.component';
import { FormsModule } from '@angular/forms';
import { TutorRoutingModule } from './tutor-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';



@NgModule({
  declarations: [
    TutorComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    TutorRoutingModule,
    ComponentsModule

  ]
})
export class TutorModule { }
