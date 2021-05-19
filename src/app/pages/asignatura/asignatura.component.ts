import { Component, OnInit } from '@angular/core';
import { IAsignaturas } from 'src/app/interfaces/interfaces';
import { Asignaturas } from 'src/app/models/models';
import { MaterialService } from 'src/app/services/material.service';

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

  openModal(asignatura?: IAsignaturas){
    if(asignatura){
      this.asignatura = JSON.parse(JSON.stringify(asignatura))
    }
    this.showModal = true;
  }

  closeModal(showModal: boolean) {
    this.asignatura = new Asignaturas();
    this.showModal = showModal;
  }

  updateAsignatura(tempAsignatura: IAsignaturas) {
    const index = this.asignaturas.findIndex(o => o.id == tempAsignatura.id)

    if(index > -1) {
      this.asignaturas.splice(index, 1, tempAsignatura);
      location.reload();
    } else {
      this.asignaturas.push(tempAsignatura);
      this.getAsignaturaList();
    }
  }

  deleteasignatura(id: number) {
    this._materialService.deleteAs(id).subscribe(
      () => {
        this.getAsignaturaList();
      },
      (err) => {
        console.log(err);
      }
    );
  }

}
