import { Component, OnInit } from '@angular/core';
import { ITutor } from 'src/app/interfaces/interfaces';
import { UsersService } from 'src/app/services/users.service';
import { Tutor } from 'src/app/models/models';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-tutor',
  templateUrl: './tutor.component.html',
  styleUrls: ['./tutor.component.css']
})
export class TutorComponent implements OnInit {
  public showModal = false;
  public profesorModal = false;

  public tutors: ITutor[] = [];

  public tutor = new Tutor();

  constructor(public _usersService: UsersService) { }

  ngOnInit(): void {
    this.getTutorList()
  }

   /**
   * Metodo que obtiene la lista de Tutores
   */
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

   /**
   * Abre el modal del Profesor
   * @param profesor 
   */
  openModal(tutor?: ITutor){
    if(tutor){
      this.tutor = JSON.parse(JSON.stringify(tutor))
    }
    this.showModal = true;
  }

  /**
   * Cierra el Modal del Profesor
   * @param showModal 
   */
  closeModal(showModal: boolean) {
    this.tutor = new Tutor();
    this.showModal = showModal;
  }

  // openprofesorModal (tutor: ITutor){
  //   this.tutor.id = tutor.id
  //   this.getProfesorTutors(tutor.id)
  //   this.profesorModal = true;
  // }

  // getProfesorTutors(tutor: number){
  //   this._profesorTutorService.getProfesorByID(tutor).subscribe(resp => {
  //     this.profesorTutors = resp
  //   }, err => {
  //     console.log(err)
  //   })
  // }

  // closeProfesorModal(showModal: boolean){
  //   this.tutor = new Tutor()
  //     this.profesorModal = showModal;
  // }

    /**
   * Metodo que actualiza el tutor
   * @param tutor 
   */
  updateTutor(tutor: ITutor) {
    const index = this.tutors.findIndex(o => o.id == tutor.id)

    if(index > -1) {
      Swal.fire({
        icon: 'success',
        titleText: 'Success',
        text: `Tutor actualizado`,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Ok',
        confirmButtonColor: '#17a2b8'
      })
      this.tutors.splice(index, 1, tutor);
    } else {
      Swal.fire({
        icon: 'success',
        titleText: 'Success',
        text: `Tutor creado`,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Ok',
        confirmButtonColor: '#17a2b8'
      })
      this.tutors.push(tutor);
      this.getTutorList();
    }
  }

  /**
   * Metodo que borra un tutor
   * @param id 
   */
  deletetutor(id: number) {
    Swal.fire({
      icon: 'question',
      text: `¿Desea eliminar este Tutor?`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#17a2b8',
      showConfirmButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#dc3545'
    }).then((result) => {
      if(result.isConfirmed) {
    this._usersService.deleteT(id).subscribe(
      () => {
        this.getTutorList();
      },
      (err) => {
        console.log(err);
      })
    }
  })
}
}
