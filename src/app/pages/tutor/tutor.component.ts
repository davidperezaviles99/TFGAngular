import { Component, OnInit } from '@angular/core';
import { ITutor } from 'src/app/interfaces/interfaces';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.css']
})
export class TutorComponent implements OnInit {

  public showModal = false;

  public tutors: ITutor[] = [];

  public tutor: ITutor = {
    id: null,
    name: null,
    lastname: null,
    email: null,
    role: null,
    profesor: [],
    alumno: []
  }

  constructor(public _usersService: UsersService) { }

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
    if(this.tutor){
      this.tutor = JSON.parse(JSON.stringify(this.tutor))
    }
    this.showModal = true;
  }

  closeModal(showModal: boolean) {
    this.tutor = {
      id: null,
    name: null,
    lastname: null,
    email: null,
    role: null,
    profesor: [],
    alumno: [],
    }
    this.showModal = showModal;
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
    this._usersService.deleteT(id).subscribe(resp => {
      this.updateTutor(resp)
    }, err => {
      console.log(err)
    })
  }
}
