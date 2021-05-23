import { Component, OnInit } from '@angular/core';
import { IDiario, IEvaluacion } from 'src/app/interfaces/interfaces';
import { Diario, Evaluacion } from 'src/app/models/models';
import { DiarioService } from 'src/app/services/diario.service';

@Component({
  selector: 'app-diario',
  templateUrl: './diario.component.html',
  styleUrls: ['./diario.component.css']
})
export class DiarioComponent implements OnInit {
  public showModal = false;
  public showEvaluacionModal = false;

  public diarios: IDiario[] = [];
  public evaluacions: IEvaluacion[] = [];

  public diario = new Diario();
  public evaluacion = new Evaluacion();
  
  constructor(public _diarioService: DiarioService) { }

  ngOnInit(): void {
    this.getDiarioList();
    this.getEvaluacionList();
  }

  getDiarioList() {
    this._diarioService.getDiarioList().subscribe(
      (resp) => {
        this.diarios = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getEvaluacionList() {
    this._diarioService.getEvaluacionList().subscribe(
      (resp) => {
        this.evaluacions = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  closeModal(showModal: boolean, type: string) {
    switch (type) {
      case 'evaluacion':
        this.evaluacion = new Evaluacion();
        this.showEvaluacionModal = showModal;
        break;
      case 'diario':
        this.diario = new Diario();
        this.showModal = showModal;
        break;
      default:
        break;
    }
  }

  openModal(
    type: string,
    evaluacion?: IEvaluacion,
    diario?: IDiario
  ) {
    switch (type) {
      case 'evaluacion':
        this.evaluacion = { ...evaluacion };
        this.showEvaluacionModal = true;
        break;
      case 'diario':
        this.showModal = true;
        break;
      default:
        break;
    }
  }

  updateDiario(diario: IDiario) {
    const index = this.diarios.findIndex(o => o.id == diario.id)

    if(index > -1) {
      this.diarios.splice(index, 1, diario);
    } else {
      this.diarios.push(diario);
      this.getDiarioList();
    }
  }

  deletediario(id: number) {
    this._diarioService.deleteD(id).subscribe(
      () => {
        this.getDiarioList();
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateEvaluacion(evaluacion: IEvaluacion) {
    const index = this.evaluacions.findIndex(o => o.id == this.evaluacion.id)

    if(index > -1) {
      this.evaluacions.splice(index, 1, evaluacion);
    } else {
      this.evaluacions.push(evaluacion);
      this.getEvaluacionList();
    }
  }

  deleteevaluacion(id: number) {
    this._diarioService.deleteE(id).subscribe(
      () => {
        this.getEvaluacionList();
      },
      (err) => {
        console.log(err);
      }
    );
  }


}
