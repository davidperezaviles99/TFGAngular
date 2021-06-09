import { Component, OnInit } from '@angular/core';
import { IAsignaturas } from 'src/app/interfaces/interfaces';
import { Asignaturas } from 'src/app/models/models';
import { MaterialService } from 'src/app/services/material.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-asignatura',
  templateUrl: './asignatura.component.html',
  styleUrls: ['./asignatura.component.css']
})
export class AsignaturaComponent implements OnInit {
  public showModal = false;

  public asignaturas: IAsignaturas[] = [];

  public asignatura = new Asignaturas();

  constructor(public _materialService: MaterialService) { }

  ngOnInit(): void {
    this.getAsignaturaList();
  }

  /**
   * Metodo que obtiene la lista de Asignaturas
   */
  getAsignaturaList() {
    this._materialService.getAsignaturaList().subscribe(
      (resp) => {
        this.asignaturas = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /**
   * Abre el Modal de la asignatura
   * @param asignatura
   */
  openModal(asignatura?: IAsignaturas){
    if(asignatura){
      this.asignatura = JSON.parse(JSON.stringify(asignatura))
    }
    this.showModal = true;
  }

   /**
   * Metodo que cierra el modal
   * @param showModal 
   */
  closeModal(showModal: boolean) {
    this.asignatura = new Asignaturas();
    this.showModal = showModal;
  }


  /**
   * Metodo que actualiza la asignatura
   * @param asignatura 
   */
  updateAsignatura(asignatura: IAsignaturas) {
    const index = this.asignaturas.findIndex(a => a.id == asignatura.id)

    if(index > -1) {
      Swal.fire({
        icon: 'success',
        titleText: 'Success',
        text: `Asignatura actualizada`,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Ok',
        confirmButtonColor: '#17a2b8'
      })
      this.asignaturas.splice(index, 1, asignatura);
    } else {
      Swal.fire({
        icon: 'success',
        titleText: 'Success',
        text: `Asignatura creada`,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Ok',
        confirmButtonColor: '#17a2b8'
      })
      this.asignaturas.push(asignatura);
      this.getAsignaturaList();
    }
  }

  /**
   * Metodo que borra la asignatura
   * @param id 
   */
  deleteasignatura(id: number) {
    Swal.fire({
      icon: 'question',
      text: `¿Desea eliminar esta asignatura?`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#17a2b8',
      showConfirmButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#dc3545'
    }).then((result) => {
      if(result.isConfirmed) {
    this._materialService.deleteAs(id).subscribe(
      () => {
        this.getAsignaturaList();
      },
      (err) => {
        console.log(err);
      })
    }
  })
}
}

