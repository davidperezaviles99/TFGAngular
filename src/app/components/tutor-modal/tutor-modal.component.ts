import { getMissingNgModuleMetadataErrorData } from '@angular/compiler';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IProfesor, IProfesorTutor, ITutor } from 'src/app/interfaces/interfaces';
import { ProfesorTutorService } from 'src/app/services/profesor-tutor.service';

@Component({
  selector: 'app-tutor-modal',
  templateUrl: './tutor-modal.component.html',
  styleUrls: ['./tutor-modal.component.css']
})
export class TutorModalComponent implements OnInit {

  public tutors: ITutor[] = [];

  @Input() showModal: boolean;
  @Input() profesorTutor: IProfesorTutor[];
  @Input() profesor: IProfesor;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  
  constructor( private _profesorTutorService: ProfesorTutorService) { }

  ngOnInit(): void {
    this.getTutor()
  }

  asignarTutor(tutor: ITutor){
    const profesorTutor: IProfesorTutor = {
      profesor : this.profesor,
      tutor
    }

    this._profesorTutorService.asignarTutor(profesorTutor).subscribe((resp: IProfesorTutor) => {
      this.profesorTutor.push(resp)
      console.log(resp)
    }, err => {
      console.log(err)
    })
  }
  
  checkTutor(tutor: ITutor): boolean{
    const check = this.profesorTutor.some(z => z.tutor.id == tutor.id)

    return check
  }

  deleteTutor(profesorTutor: IProfesorTutor){
    this._profesorTutorService.delete(profesorTutor).subscribe(resp => {
      const index = this.profesorTutor.findIndex(o => o.id == resp.id)
      this.profesorTutor.splice(index, 1)
    }, err => {
      console.log(err)
    })
  }

  getTutor(){
    this._profesorTutorService.getTutor().subscribe(resp => {
      this.tutors = resp
    }, err => {
      console.log(err)
    })
  }

  closeModal() {
    this.close.emit(false);
  }

}
