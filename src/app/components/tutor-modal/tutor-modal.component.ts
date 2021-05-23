import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEquipo, ITutor } from 'src/app/interfaces/interfaces';
import { EquipoService } from 'src/app/services/equipo.service';

@Component({
  selector: 'app-tutor-modal',
  templateUrl: './tutor-modal.component.html',
  styleUrls: ['./tutor-modal.component.css']
})
export class TutorModalComponent implements OnInit {

  public tutors: ITutor[] = [];

  @Input() showModal: boolean;
  @Input() equipos: IEquipo[];
  @Input() alumnoId: number;
  @Output() close: EventEmitter<boolean> = new EventEmitter();


  constructor(private _equipoService: EquipoService) { }

  ngOnInit(): void {
    this.getTutor()
  }

  asignarTutor(tutor: ITutor){
    const equipo: IEquipo = {
      alumnoId: this.alumnoId,
      tutor,
      profesor: null
    }

    this._equipoService.asignarTutor(equipo).subscribe(resp => {
      this.equipos.push(resp)
      console.log(resp)
    }, err => {
      console.log(err)
    })
  }

  checkTutor(tutor: ITutor): boolean {
    const check = this.equipos.some(t => t.tutor.id == tutor.id)

    return check
  }

  deleteTutor(equipo: IEquipo){
    this._equipoService.delete(equipo).subscribe(resp => {
      const index = this.equipos.findIndex(o => o.id == resp.id)
      this.equipos.splice(index, 1)
    }, err => {
      console.log(err)
    })
  }

  getTutor() {
    this._equipoService.getTutor().subscribe(resp => {
      this.tutors = resp
    }, err => {
      console.log(err)
    })
  }

  closeModal() {
    this.close.emit(false);
  }

}
