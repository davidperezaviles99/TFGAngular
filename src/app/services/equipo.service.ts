import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAlumno, IConsulta, IEquipo, IProfesor, ITutor } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  constructor(private _http: HttpClient) { }

  getEquipoList(): Observable<IEquipo[]>{
    return this._http.get<IEquipo[]>(`${environment.base_url}/Equipos`)
  }

  getProfesor(){
    return this._http.get<IProfesor[]>(`${environment.base_url}/Equipos/Profesores`)
  }

  getTutor(){
    return this._http.get<ITutor[]>(`${environment.base_url}/Equipos/Tutores`)
  }

  getEquipoByID(id: number) {
    return this._http.get<IEquipo[]>(`${environment.base_url}/Equipos/Equipos/${id}`)
  }

  getConsulta(Consulta: IConsulta) {
    return this._http.post<IEquipo[]>(`${environment.base_url}/Equipos/consultaequipo`, Consulta)
  }

  createEquipo(alumno: IAlumno) {
    return this._http.post(`${environment.base_url}/Equipos/create`, alumno)
  }

  getEquipoID(id: number) {
    return this._http.get<IEquipo>(`${environment.base_url}/Equipos/${id}`)
  }

  getEquipo(): IEquipo {
    return JSON.parse(localStorage.getItem('equipo'))
}

  asignarTutor(equipo: IEquipo) {
    return this._http.post<IEquipo>(`${environment.base_url}/Equipos/AsignarTutor`, equipo)
  }

  asignarProfesor(equipo: IEquipo) {
    return this._http.post<IEquipo>(`${environment.base_url}/Equipos/AsignarProfesor`, equipo)
  }

  delete(equipo: IEquipo) {
    return this._http.post<IEquipo>(`${environment.base_url}/Equipos/DeleteEquipo`, equipo)
  }
}
