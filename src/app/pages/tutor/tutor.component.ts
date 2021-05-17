import { Component, OnInit } from '@angular/core';
import { IProfesorTutor, ITutor } from 'src/app/interfaces/interfaces';
import { UsersService } from 'src/app/services/users.service';
import { ProfesorTutorService } from 'src/app/services/profesor-tutor.service';
import { Tutor } from 'src/app/models/models';


@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.css']
})
export class TutorComponent implements OnInit {
  public showModal = false;
  public profesorModal = false;

  public tutors: ITutor[] = [];
  public profesorTutors: IProfesorTutor[] = [];

  public tutor = new Tutor();

  constructor(public _usersService: UsersService, public _profesorTutorService: ProfesorTutorService) { }

  ngOnInit(): void {
    this.getTutorList()
  }

  getTutorList() {
    this._usersService.getTutorList().subscribe(
      (resp) => {
        this.tutors = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openModal(tutor?: ITutor){
    if(tutor){
      this.tutor = JSON.parse(JSON.stringify(tutor))
    }
    this.showModal = true;
  }

  closeModal(showModal: boolean) {
    this.tutor = new Tutor();
    this.showModal = showModal;
  }

  openprofesorModal (tutor: ITutor){
    this.tutor.id = tutor.id
    this.getProfesorTutors(tutor.id)
    this.profesorModal = true;
  }

  getProfesorTutors(tutor: number){
    this._profesorTutorService.getProfesorByID(tutor).subscribe(resp => {
      this.profesorTutors = resp
    }, err => {
      console.log(err)
    })
  }

  closeProfesorModal(showModal: boolean){
    this.tutor = new Tutor()
      this.profesorModal = showModal;
  }

  updateTutor(tempTutor: ITutor) {
    const index = this.tutors.findIndex(o => o.id == tempTutor.id)

    if(index > -1) {
      this.tutors.splice(index, 1, tempTutor)
    } else {
      this.tutors.push(tempTutor)
    }
  }

  deletetutor(id: number) {
    this._usersService.deleteT(id).subscribe(
      () => {
        this.getTutorList();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
