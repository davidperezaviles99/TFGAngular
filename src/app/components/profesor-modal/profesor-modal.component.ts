import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProfesor, IProfesorTutor, ITutor } from 'src/app/interfaces/interfaces';
import { ProfesorTutorService } from 'src/app/services/profesor-tutor.service';

@Component({
  selector: 'app-profesor-modal',
  templateUrl: './profesor-modal.component.html',
  styleUrls: ['./profesor-modal.component.css']
})
export class ProfesorModalComponent implements OnInit {

  public profesors: IProfesor[] = [];

  @Input() showModal: boolean;
  @Input() profesorTutor: IProfesorTutor[];
  @Input() tutor: ITutor;
  @Output() close: EventEmitter<boolean> = new EventEmitter();

  constructor(private _profesorTutorService: ProfesorTutorService) { }

  ngOnInit(): void {
    this.getProfesor
  }

  asignarProfesor(profesor: IProfesor){
    const profesorTutor: IProfesorTutor = {
      tutor : this.tutor,
      profesor
    }

    this._profesorTutorService.asignarProfesor(profesorTutor).subscribe((resp: IProfesorTutor) => {
      this.profesorTutor.push(resp)
      console.log(resp)
    }, err => {
      console.log(err)
    })
  }

  checkProfesor(profesor: IProfesor): boolean {
    const check = this.profesorTutor.some(z => z.profesor.id == profesor.id)
    return check
  }

  deleteProfesor(profesorTutor: IProfesorTutor){
    this._profesorTutorService.delete(profesorTutor).subscribe(resp => {
      const index = this.profesorTutor.findIndex(o => o.id == resp.id)
      this.profesorTutor.splice(index, 1)
    }, err => {
      console.log(err)
    })
  }

  getProfesor(){
    this._profesorTutorService.getProfesor().subscribe(resp => {
      this.profesors = resp
    }, err => {
      console.log(err)
    })
  }

  closeModal() {
    this.close.emit(false);
  }


}
