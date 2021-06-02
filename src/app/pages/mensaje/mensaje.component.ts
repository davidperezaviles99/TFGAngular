import { Component, OnInit } from '@angular/core';
import { IAlumno, IConsulta, IEquipo, IMensaje, IProfesor, ITutor, IUser } from 'src/app/interfaces/interfaces';
import { Alumno, Mensaje, Profesor, Tutor } from 'src/app/models/models';
import { EquipoService } from 'src/app/services/equipo.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-mensaje',
  templateUrl: './mensaje.component.html',
  styleUrls: ['./mensaje.component.css']
})
export class MensajeComponent implements OnInit {
  public showModal = false;

  public alumnos: IAlumno[] = [];
  public alumno = new Alumno();

  public tutors: ITutor[] = [];
  public tutor = new Tutor();

  public profesors: IProfesor[] = [];
  public profesor = new Profesor();

  public mensajes: IMensaje[] = [];
  public mensaje = new Mensaje();

  public equipos: IEquipo[] = [];
  public equipo: IEquipo;

  public user: IUser;

  constructor(public _mensajeService: MensajeService,
    private _equipoService: EquipoService,
    private _usersService: UsersService) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.equipo = JSON.parse(localStorage.getItem('equipo'));
    // this.getMensajeList();
    this.getConsulta();
    this.getUser();
    this.getMensajes();
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

  getUser(){
    this.user = this._usersService.getUser();
  }

  // getMensajeList() {
  //   this._mensajeService.getMensajeList().subscribe(
  //     (resp) => {
  //       this.mensajes = resp;
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  openModal(mensaje?: IMensaje){
    if(mensaje){
      this.mensaje = JSON.parse(JSON.stringify(mensaje))
    }
    this.showModal = true;
  }

  closeModal(showModal: boolean) {
    this.mensaje = new Mensaje();
    this.showModal = showModal;
  }

  updateMensaje(mensaje: IMensaje) {
    const index = this.mensajes.findIndex(o => o.id == mensaje.id)

    if(index > -1) {
      this.mensajes.splice(index, 1, mensaje);
    } else {
      this.mensajes.push(mensaje);
    }
  }

  getMensajes(){
    this._mensajeService.getMensajes(this.user.id).subscribe(
      (resp) => {
        this.mensajes = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getMensajeID(id: number) {
    this._mensajeService.getEquipoMensajeID(id).subscribe(
      (resp) => {
        this.mensaje = resp;
        const index = this.mensajes.findIndex(m => m.id == resp.id);
        if(index == -1) {
          this.mensajes.push(resp);
        }
      },
      (err) => {
        console.log(err);
      }
    );
  }



}
