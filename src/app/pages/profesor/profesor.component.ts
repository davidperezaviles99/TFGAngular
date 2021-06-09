import { Component, OnInit } from '@angular/core';
import { IProfesor } from 'src/app/interfaces/interfaces';
import { Profesor } from 'src/app/models/models';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

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

  /**
   * Metodo que obtiene la lista de Profesores
   */
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

  /**
   * Abre el modal del Profesor
   * @param profesor 
   */
  openModal(profesor?: IProfesor){
    if(profesor){
      this.profesor = JSON.parse(JSON.stringify(profesor))
    }
    this.showModal = true;
  }

  /**
   * Cierra el Modal del Profesor
   * @param showModal 
   */
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
  
  /**
   * Metodo que actualiza el profesor
   * @param profesor 
   */
  updateProfesor (profesor: IProfesor){
    const index = this.profesors.findIndex((p) => p.id == profesor.id);
    if (index > -1) {
      Swal.fire({
        icon: 'success',
        titleText: 'Success',
        text: `Profesor actualizado`,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Ok',
        confirmButtonColor: '#17a2b8'
      })
      this.profesors.splice(index, 1, profesor);
    } else {
      Swal.fire({
        icon: 'success',
        titleText: 'Success',
        text: `Profesor creado`,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Ok',
        confirmButtonColor: '#17a2b8'
      })
      this.profesors.push(profesor);
      this.getProfesorList();
    }
  }

  /**
   * Metodo que borra un profesor
   * @param id 
   */
  deleteprofesor(id: number) {
    Swal.fire({
      icon: 'question',
      text: `¿Desea eliminar este profesor?`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#17a2b8',
      showConfirmButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#dc3545'
    }).then((result) => {
      if(result.isConfirmed) {
    this._usersService.deleteP(id).subscribe(
      () => {
        this.getProfesorList();
      },
      (err) => {
        console.log(err);
      })
    }
  })
}
}
