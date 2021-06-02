import { Component, Input, OnInit } from '@angular/core';
import { IAlumno, IConsulta, IDiario, IEquipo, IEvaluacion, IProfesor, ITutor, IUser } from 'src/app/interfaces/interfaces';
import { Alumno, Diario, Evaluacion, Profesor, Tutor } from 'src/app/models/models';
import { DiarioService } from 'src/app/services/diario.service';
import { EquipoService } from 'src/app/services/equipo.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-diario',
  templateUrl: './diario.component.html',
  styleUrls: ['./diario.component.css']
})
export class DiarioComponent implements OnInit {
  public showModal = false;
  public showEvaluacionModal = false;

  roles = ['Alumno', 'Profesor','Tutor'];

  public diarios: IDiario[] = []; 
  public diario = new Diario();

  public alumnos: IAlumno[] = [];
  public alumno = new Alumno();

  public tutors: ITutor[] = [];
  public tutor = new Tutor();

  public profesors: IProfesor[] = [];
  public profesor = new Profesor();


  public equipos: IEquipo[] = [];
  public equipo: IEquipo;
  
  public evaluacions: IEvaluacion[] = [];
  public evaluacion = new Evaluacion();

  public user: IUser;
 
  constructor(public _diarioService: DiarioService, public _usersService: UsersService, private _equipoService: EquipoService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.equipo = JSON.parse(localStorage.getItem('equipo'));
    // this.getEvaluacionList();
    this.getUser();
    // this.getAlumnoList();
    // this.getEquipoList();
    this.getConsulta();
    this.getDiarios();
  }

  getUser(){
    this.user = this._usersService.getUser();
  }

  // getEquipoList() {
  //   this._equipoService.getEquipoList().subscribe(
  //     (resp) => {
  //       this.equipos = resp;
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  // getAlumnoList() {
  //   this._usersService.getAlumnoList().subscribe(
  //     (resp) => {
  //       this.alumnos = resp;
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  // getEquipoID(id: number){

  //   this._equipoService.getEquipoID(id).subscribe(
  //     (resp) => {
  //       this.equipo = resp;
  //       console.log(resp)
  //       this.getDiarioList(this.equipo.id);
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  getDiarios(){
    this._diarioService.getDiarios(this.user.id).subscribe(
      (resp) => {
        this.diarios = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  //     (resp) => {
  //       this.diario = resp;
  //       const index = this.diarios.findIndex(d => d.id == resp.id);
  //       if(index == -1) {
  //         this.diarios.push(resp);
  //       }
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  getDiarioID(id: number) {
    this._diarioService.getEquipoDiarioID(id).subscribe(
      (resp) => {
        this.diarios = resp;
        // const index = this.diarios.findIndex(d => d.id == resp.id);
        // if(index == -1) {
        // this.diarios.push(resp);
        // }
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

  openModal(diario?: IDiario){
    if(diario){
      this.diario = JSON.parse(JSON.stringify(diario))
    }
    this.showModal = true;
  }

  closeModal(showModal: boolean) {
    this.diario = new Diario();
    this.showModal = showModal;
  }

  openEvalModal(evaluacion?: IEvaluacion){
    if(evaluacion){
      this.evaluacion = JSON.parse(JSON.stringify(evaluacion))
    }
    this.showEvaluacionModal = true;
  }

  closeEvalModal(showModal: boolean) {
    this.evaluacion = new Evaluacion();
    this.showEvaluacionModal = showModal;
  }

  updateDiario(diario: IDiario) {
    const index = this.diarios.findIndex((d) => d.id == diario.id)

    if(index > -1) {
      this.diarios.splice(index, 1, diario);
      this.getDiarios();
    } else {
      this.diarios.push(diario);
      this.getDiarioID(this.equipo.id);
      this.getDiarios();
    }
  }

  deletediario(id: number) {
    this._diarioService.deleteD(id).subscribe(
      () => {
        this.getDiarios();
        this.getDiarioID(this.equipo.id);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateEvaluacion(evaluacion: IEvaluacion) {
    const index = this.evaluacions.findIndex(o => o.id == evaluacion.id)

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

  getConsulta(){
    const Consulta: IConsulta = {
      id: this.user.id,
      role: this.user.role
    }
    this._equipoService.getConsulta(Consulta).subscribe(resp =>{
      this.equipos = resp;
    })
  }

}
