import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiarioComponent } from './diario.component';
import { FormsModule } from '@angular/forms';
import { DiarioRoutingModule } from './diario-routing.module';
import { ComponentsModule } from 'src/app/components/components.module';


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
