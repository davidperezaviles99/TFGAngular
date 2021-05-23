import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IEquipo, IProfesor, ITutor } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  constructor(private _http: HttpClient) { }

  getProfesor(){
    return this._http.get<IProfesor[]>(`${environment.base_url}/Equipos/Profesores`)
  }

  getTutor(){
    return this._http.get<ITutor[]>(`${environment.base_url}/Equipos/Tutores`)
  }

  getEquipoByID(id: number) {
    return this._http.get<IEquipo[]>(`${environment.base_url}/Equipos/Equipos/${id}`)
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
