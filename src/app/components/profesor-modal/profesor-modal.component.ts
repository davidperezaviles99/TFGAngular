import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEquipo, IProfesor, ITutor } from 'src/app/interfaces/interfaces';
import { EquipoService } from 'src/app/services/equipo.service';

@Component({
  selector: 'app-profesor-modal',
  templateUrl: './profesor-modal.component.html',
  styleUrls: ['./profesor-modal.component.css']
})
export class ProfesorModalComponent implements OnInit {

  public profesors: IProfesor[] = [];

  @Input() showModal: boolean;
  @Input() equipos: IEquipo[];
  @Input() alumnoId: number;
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  constructor(private _equipoService: EquipoService) { }

  ngOnInit(): void {
    this.getProfesor();
  }

  asignarProfesor(profesor: IProfesor){
    const equipo: IEquipo = {
      alumnoId: this.alumnoId,
      profesor,
      tutor: null,
    }

    this._equipoService.asignarProfesor(equipo).subscribe(resp => {
      this.equipos.push(resp)
      console.log(resp)
    }, err => {
      console.log(err)
    })
  }

  checkProfesor(profesor: IProfesor): boolean {
    const check = this.equipos.some(p => p.profesor.id == profesor.id)

    return check
  }

  deleteProfesor(equipo: IEquipo){
    this._equipoService.delete(equipo).subscribe(resp => {
      const index = this.equipos.findIndex(o => o.id == resp.id)
      this.equipos.splice(index, 1)
    }, err => {
      console.log(err)
    })
  }

  getProfesor() {
    this._equipoService.getProfesor().subscribe(resp => {
      this.profesors = resp
    }, err => {
      console.log(err)
    })
  }

  closeModal() {
    this.close.emit(false);
  }

}
