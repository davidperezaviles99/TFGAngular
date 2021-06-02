import { Component, OnInit } from '@angular/core';
import { ICurso } from 'src/app/interfaces/interfaces';
import { Curso } from 'src/app/models/models';
import { MaterialService } from 'src/app/services/material.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  public showModal = false;

  filterPost = '';
  
  public cursos: ICurso[] = [];

  public curso = new Curso();

  constructor(public _materialservice: MaterialService) { }

  ngOnInit(): void {
    this.getCursoList();
  }

  getCursoList() {
    this._materialservice.getCursoList().subscribe(
      (resp) => {
        this.cursos = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  openModal(curso?: ICurso){
    if(curso){
      this.curso = JSON.parse(JSON.stringify(curso))
    }
    this.showModal = true;
  }

  closeModal(showModal: boolean) {
    this.curso = new Curso();
    this.showModal = showModal;
  }

  updateCurso(curso: ICurso) {
    const index = this.cursos.findIndex(o => o.id == curso.id)

    if(index > -1) {
      Swal.fire({
        icon: 'success',
        titleText: 'Success',
        text: `Curso actualizado`,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Ok',
        confirmButtonColor: '#17a2b8'
      })
      this.cursos.splice(index, 1, curso);
    } else {
      Swal.fire({
        icon: 'success',
        titleText: 'Success',
        text: `Curso creado`,
        showCancelButton: false,
        showConfirmButton: true,
        confirmButtonText: 'Ok',
        confirmButtonColor: '#17a2b8'
      })
      this.cursos.push(curso);
      this.getCursoList();
    }
  }

  deletecurso(id: number) {
    Swal.fire({
      icon: 'question',
      text: `¿Desea eliminar este Curso?`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#17a2b8',
      showConfirmButton: true,
      confirmButtonText: 'Eliminar',
      confirmButtonColor: '#dc3545'
    }).then((result) => {
      if(result.isConfirmed) {
    this._materialservice.deleteC(id).subscribe(
      () => {
        this.getCursoList();
      },
      (err) => {
        console.log(err);
      })
    }
  })
}
}

