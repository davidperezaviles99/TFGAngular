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

  /**
   * Metodo que trae la lista de equipos
   * @returns 
   */
  getEquipoList(): Observable<IEquipo[]>{
    return this._http.get<IEquipo[]>(`${environment.base_url}/Equipos`)
  }

  /**
   * Metodo que trae la lista de profesores
   * @returns 
   */
  getProfesor(){
    return this._http.get<IProfesor[]>(`${environment.base_url}/Equipos/Profesores`)
  }

  /**
   * Metodo que trae la lista de tutores
   * @returns 
   */
  getTutor(){
    return this._http.get<ITutor[]>(`${environment.base_url}/Equipos/Tutores`)
  }

  /**
   * Metodo que trae los equipos por su id
   * @param id 
   * @returns 
   */
  getEquipoByID(id: number) {
    return this._http.get<IEquipo[]>(`${environment.base_url}/Equipos/Equipos/${id}`)
  }

  /**
   * Metodo que consulta los equipos que tiene un usuario
   * @param Consulta 
   * @returns 
   */
  getConsulta(Consulta: IConsulta) {
    return this._http.post<IEquipo[]>(`${environment.base_url}/Equipos/consultaequipo`, Consulta)
  }

  /**
   * Metodo que crea un equipo
   * @param alumno 
   * @returns 
   */
  createEquipo(alumno: IAlumno) {
    return this._http.post(`${environment.base_url}/Equipos/create`, alumno)
  }

  /**
   * Metodo que trae el equipo por id
   * @param id 
   * @returns 
   */
  getEquipoID(id: number) {
    return this._http.get<IEquipo>(`${environment.base_url}/Equipos/${id}`)
  }

  getEquipo(): IEquipo {
    return JSON.parse(localStorage.getItem('equipo'))
}

/**
 * Metodo que asigna un tutor a un equipo
 * @param equipo 
 * @returns 
 */
  asignarTutor(equipo: IEquipo) {
    return this._http.post<IEquipo>(`${environment.base_url}/Equipos/AsignarTutor`, equipo)
  }

  /**
 * Metodo que asigna un profesor a un equipo
 * @param equipo 
 * @returns 
 */
  asignarProfesor(equipo: IEquipo) {
    return this._http.post<IEquipo>(`${environment.base_url}/Equipos/AsignarProfesor`, equipo)
  }

  /**
   * Metodo que borra un equipo
   * @param equipo 
   * @returns 
   */
  delete(equipo: IEquipo) {
    return this._http.post<IEquipo>(`${environment.base_url}/Equipos/DeleteEquipo`, equipo)
  }
}
