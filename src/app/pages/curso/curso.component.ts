import { Component, OnInit } from '@angular/core';
import { ICurso } from 'src/app/interfaces/interfaces';
import { Curso } from 'src/app/models/models';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-curso',
  templateUrl: './curso.component.html',
  styleUrls: ['./curso.component.css']
})
export class CursoComponent implements OnInit {
  public showModal = false;

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

  updateCurso(tempCurso: ICurso) {
    const index = this.cursos.findIndex(o => o.id == tempCurso.id)

    if(index > -1) {
      this.cursos.splice(index, 1, tempCurso);
      location.reload();
    } else {
      this.cursos.push(tempCurso);
      this.getCursoList();
    }
  }

  deleteasignatura(id: number) {
    this._materialservice.deleteC(id).subscribe(
      () => {
        this.getCursoList();
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
