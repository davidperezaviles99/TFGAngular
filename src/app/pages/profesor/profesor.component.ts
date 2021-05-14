import { dashCaseToCamelCase } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { IProfesor } from 'src/app/interfaces/interfaces';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.css']
})
export class ProfesorComponent implements OnInit {
public showModal = false;

public profesors: IProfesor[] = [];

public profesor: IProfesor = {
  id: null,
  name: null,
  lastname: null,
  email: null,
  role: null,
  tutor: []
}

  constructor(public _usersService: UsersService) { }

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
    if(this.profesor){
      this.profesor = JSON.parse(JSON.stringify(this.profesor))
    }
    this.showModal = true;
  }

  closeModal(showModal: boolean) {
    this.profesor = {
      id: null,
      name: null,
    lastname: null,
    email: null,
    role: null,
    tutor: [],
    }
    this.showModal = showModal;
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
    this._usersService.deleteP(id).subscribe(resp => {
      this.updateProfesor(resp)
    }, err => {
      console.log(err)
    })
  }
}
