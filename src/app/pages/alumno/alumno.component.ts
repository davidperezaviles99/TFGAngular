import { i18nMetaToJSDoc } from '@angular/compiler/src/render3/view/i18n/meta';
import { Component, OnInit } from '@angular/core';
import { IAlumno, IEquipo, ITutor } from 'src/app/interfaces/interfaces';
import { Alumno } from 'src/app/models/models';
import { EquipoService } from 'src/app/services/equipo.service';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

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

  /**
   * Metodo que obtiene la lista de Alumnos
   */
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

  /**
   * Abre el Modal de Alumno
   * @param alumno
   */
  openModal(alumno?: IAlumno){
    if(alumno){
      this.alumno = JSON.parse(JSON.stringify(alumno))
    }
    this.showModal = true;
  }

  /**
   * Metodo que cierra el modal
   * @param showModal 
   */
  closeModal(showModal: boolean) {
    this.alumno = new Alumno();
    this.showModal = showModal;
  }

  /**
   * Abre el modal del Tutor
   * @param alumno 
   */
  openTutorModal(alumno: IAlumno){
    this.alumnoId = alumno.id;
    this.getEquipos(alumno.id);
    this.tutorModal = true;
  }

  /**
   * Obtiene la lista de equipos
   * @param alumno 
   */
  getEquipos(alumno: number){
    this._equipoService.getEquipoByID(alumno).subscribe(resp => {
      this.equipos = resp
    }, err => {
      console.log(err)
    })
  }

  /**
   * Cierra el modal del tutor
   * @param showModal 
   */
  closeTutorModal(showModal: boolean){
    this.alumno = new Alumno();
    this.tutorModal = showModal;
  }

  /**
   * Abre el modal del Tutor
   * @param alumno 
   */
  openProfesorModal(alumno: IAlumno){
    this.alumnoId = alumno.id;
    this.getEquipos(alumno.id);
    this.profesorModal = true;
  }

  /**
   * Cierra el modal del tutor
   * @param showModal 
   */
  closeProfesorModal(showModal: boolean){
    this.alumno = new Alumno();
    this.profesorModal = showModal;
  }

  /**
   * Metodo que actualiza el alumno
   * @param alumno 
   */
  updateAlumno(alumno: IAlumno) {
    const index = this.alumnos.findIndex(o => o.id == alumno.id)

    if(index > -1) {
      Swal.fire({
        icon: 'success',
        titleText: 'Success',
        text: `Alumno actualizado`,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Ok',
        confirmButtonColor: '#17a2b8'
      })
      this.alumnos.splice(index, 1, alumno)
    } else {
      Swal.fire({
        icon: 'success',
        titleText: 'Success',
        text: `Alumno creado`,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Ok',
        confirmButtonColor: '#17a2b8'
      })
      this.alumnos.push(alumno);
      this.getAlumnoList();
    }
  }

  /**
   * Metodo que borra el alumno de la base de datos
   * @param id 
   */
  deletealumno(id: number) {
    Swal.fire({
      icon: 'question',
      text: `??Desea eliminar este alumno?`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#17a2b8',
      showConfirmButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#dc3545'
    }).then((result) => {
      if(result.isConfirmed) {
    this._usersService.deleteA(id).subscribe(
      () => {
        this.getAlumnoList();
      },
      (err) => {
        console.log(err);
      })
    }
  })
}
}
