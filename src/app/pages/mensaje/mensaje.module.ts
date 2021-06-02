import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ComponentsModule } from 'src/app/components/components.module';
import { MensajeComponent } from './mensaje.component';
import { MensajeRoutingModule } from './mensaje-routing.module';

@NgModule({
  declarations: [
    MensajeComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MensajeRoutingModule,
    ComponentsModule
  ]
})
export class MensajeModule { }
