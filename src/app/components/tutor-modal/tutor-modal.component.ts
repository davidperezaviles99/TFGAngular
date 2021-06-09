import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEquipo, IProfesor, ITutor } from 'src/app/interfaces/interfaces';
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
    this.getTutor();
  }

   /**
   * Metodo que asigna el tutor a un alumno determinado
   * @param profesor 
   */
  asignarTutor(tutor: ITutor){
    const equipo: IEquipo = {
      alumnoId: this.alumnoId,
      tutor,
    }

    this._equipoService.asignarTutor(equipo).subscribe(resp => {
      this.equipos.push(resp)
    }, err => {
      console.log(err)
    })
  }

  /**
   * Comprueba si ese Alumno tiene un tutor asignado.
   * @param profesor 
   * @returns 
   */
  checkTutor(tutor: ITutor): boolean {
    const check = this.equipos.some(t => {
      if(t.tutor != null){
        return t.tutor.id == tutor.id;
      }
    })

    return check;
  }

   /**
   * Elimina un Tutor y deja de estar asignado
   * @param equipo 
   */
  deleteTutor(equipo: IEquipo){
    equipo.tutor = null;

    this._equipoService.asignarTutor(equipo).subscribe(resp => {
      const index = this.equipos.findIndex(e => e.alumnoId == equipo.alumnoId)
      this.equipos.splice(index, 1);
    }, err => {
      console.log(err)
    })
  }

  /**
   * Recoge los Tutores que hay en la BBDD y los muestra
   */
  getTutor() {
    this._equipoService.getTutor().subscribe(resp => {
      this.tutors = resp
    }, err => {
      console.log(err)
    })
  }

  /**
   * Metodo que cierra el Modal
   */
  closeModal() {
    this.close.emit(false);
  }

}
