import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { IAlumno, IEquipo, ITutor } from 'src/app/interfaces/interfaces';
import { Alumno } from 'src/app/models/models';
import { EquipoService } from 'src/app/services/equipo.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.css']
})
export class AlumnoComponent implements OnInit {
  public showModal = false;
  public tutorModal = false;
  public profesorModal = false;
  public alumnoId: number;

  public alumnos: IAlumno[] = [];
  public equipos: IEquipo[] = [];

  public alumno = new Alumno();

  constructor(public _usersService: UsersService, public _equipoService: EquipoService) { }

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

  openTutorModal(alumno: IAlumno){
    this.alumnoId = alumno.id;
    this.getEquipos(alumno.id);
    this.tutorModal = true;
  }

  getEquipos(alumno: number){
    this._equipoService.getEquipoByID(alumno).subscribe(resp => {
      this.equipos = resp
    }, err => {
      console.log(err)
    })
  }

  closeTutorModal(showModal: boolean){
    this.alumno = new Alumno();
    this.tutorModal = showModal;
  }

  openProfesorModal(alumno: IAlumno){
    this.alumnoId = alumno.id;
    this.getEquipos(alumno.id);
    this.profesorModal = true;
  }

  closeProfesorModal(showModal: boolean){
    this.alumno = new Alumno();
    this.profesorModal = showModal;
  }

  updateAlumno(alumno: IAlumno) {
    const index = this.alumnos.findIndex(o => o.id == alumno.id)

    if(index > -1) {
      this.alumnos.splice(index, 1, alumno)
    } else {
      this.alumnos.push(alumno);
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
