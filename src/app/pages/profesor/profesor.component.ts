import { Component, OnInit } from '@angular/core';
import { IProfesor } from 'src/app/interfaces/interfaces';
import { Profesor } from 'src/app/models/models';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {
public showModal = false;

public profesors: IProfesor[] = [];

public profesor = new Profesor();

  constructor(public _usersService: UsersService) { }

  ngOnInit(): void {
    this.getProfesorList();
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

  // opentutorModal(profesor: IProfesor){
  //   this.profesor.id = profesor.id
  //   this.getProfesorTutors(profesor.id);
  //   this.tutorModal = true;
  // }

  // getProfesorTutors(profesor: number){
  //   this._profesorTutorService.getProfesorByID(profesor).subscribe(resp => {
  //     this.profesorTutors = resp
  //   }, err => {
  //     console.log(err)
  //   })
  // }

  // closeTutorModal(showModal: boolean){
  //   this.profesor = new Profesor()
  //     this.tutorModal = showModal;
  // }
  

  updateProfesor (profesor: IProfesor){
    const index = this.profesors.findIndex((p) => p.id == profesor.id);
    if (index > -1) {
      this.profesors.splice(index, 1, profesor);
    } else {
      this.profesors.push(profesor);
      this.getProfesorList();
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
