import { Component, OnInit } from '@angular/core';
import { IProfesor, IProfesorTutor } from 'src/app/interfaces/interfaces';
import { Profesor } from 'src/app/models/models';
import { ProfesorTutorService } from 'src/app/services/profesor-tutor.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {
public showModal = false;
public tutorModal = false;

public profesors: IProfesor[] = [];
public profesorTutors: IProfesorTutor[] = [];

public profesor = new Profesor();

  constructor(public _usersService: UsersService, public _profesorTutorService: ProfesorTutorService) { }

  ngOnInit(): void {
    this.getProfesorList()
  }

  getProfesorList() {
    this._usersService.getProfesorList().subscribe(
      (resp) => {
        this.profesors = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openModal(profesor?: IProfesor){
    if(profesor){
      this.profesor = JSON.parse(JSON.stringify(profesor))
    }
    this.showModal = true;
  }

  closeModal(showModal: boolean) {
    this.profesor = new Profesor();
    this.showModal = showModal;
  }

  opentutorModal(profesor: IProfesor){
    this.profesor.id = profesor.id
    this.getProfesorTutors(profesor.id);
    this.tutorModal = true;
  }

  getProfesorTutors(profesor: number){
    this._profesorTutorService.getProfesorByID(profesor).subscribe(resp => {
      this.profesorTutors = resp
    }, err => {
      console.log(err)
    })
  }

  closeTutorModal(showModal: boolean){
    this.profesor = new Profesor()
      this.tutorModal = showModal;
  }
  

  updateProfesor(tempProfesor: IProfesor) {
    const index = this.profesors.findIndex(o => o.id == tempProfesor.id)

    if(index > -1) {
      this.profesors.splice(index, 1, tempProfesor)
    } else {
      this.profesors.push(tempProfesor)
    }
  }

  deleteprofesor(id: number) {
    this._usersService.deleteP(id).subscribe(
      () => {
        this.getProfesorList();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
