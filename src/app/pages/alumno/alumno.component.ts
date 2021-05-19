import { Component, OnInit } from '@angular/core';
import { IAlumno, ITutor } from 'src/app/interfaces/interfaces';
import { Alumno } from 'src/app/models/models';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {
  public showModal = false;

  public alumnos: IAlumno[] = [];

  public alumno = new Alumno();

  constructor(public _usersService: UsersService) { }

  ngOnInit(): void {
    this.getAlumnoList();
  }

  getAlumnoList() {
    this._usersService.getAlumnoList().subscribe(
      (resp) => {
        this.alumnos = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openModal(alumno?: IAlumno){
    if(alumno){
      this.alumno = JSON.parse(JSON.stringify(alumno))
    }
    this.showModal = true;
  }

  closeModal(showModal: boolean) {
    this.alumno = new Alumno();
    this.showModal = showModal;
  }

  updateAlumno(tempAlumno: IAlumno) {
    const index = this.alumnos.findIndex(o => o.id == tempAlumno.id)

    if(index > -1) {
      this.alumnos.splice(index, 1, tempAlumno)
    } else {
      this.alumnos.push(tempAlumno);
      this.getAlumnoList();
    }
  }

  deletealumno(id: number) {
    this._usersService.deleteA(id).subscribe(
      () => {
        this.getAlumnoList();
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
