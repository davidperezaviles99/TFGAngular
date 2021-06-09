import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IDiario, IEvaluacion } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class DiarioService {

  constructor(private _http: HttpClient, private router: Router) { }

  /**
   * Metodo que trae la lista de Diarios
   * @returns 
   */
  getDiarioList(): Observable<IDiario[]>{
    return this._http.get<IDiario[]>(`${environment.base_url}/Diarios`)
  }

  /**
   * Metodo que trae la lista por id
   * @param id 
   * @returns 
   */
  getDiarioID(id: number): Observable<IDiario>{
    return this._http.get<IDiario>(`${environment.base_url}/Diarios/${id}`)
  }

  /**
   * Metodo que trae la lista de usuarios por el id
   * @param id 
   * @returns 
   */
  getDiarios(id: number) {
    return this._http.get<IDiario[]>(`${environment.base_url}/Diarios/getUserDiario/${id}`
    )
    .pipe(tap((resp) => resp.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())));
  }

  /**
   * Metodo que trae la lista de diarios de un equipo en concreto
   * @param id 
   * @returns 
   */
  getEquipoDiarioID(id: number) {
    return this._http.get<IDiario[]>(`${environment.base_url}/Diarios/getEquipoDiario/${id}`
    )
    .pipe(tap((resp) => resp.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())));
  }

  /**
   * Metodo que registra un diario
   * @param asignaturaData 
   * @returns 
   */
  registerD(asignaturaData: IDiario): Observable<IDiario> {
    return this._http.post<IDiario>(`${environment.base_url}/Diarios/create`, asignaturaData)
  }

  /**
   * Metodo que actualiza un diario
   * @param asignaturaData 
   * @returns 
   */
  updateD(asignaturaData: IDiario): Observable<IDiario> {
    return this._http.put<IDiario>(`${environment.base_url}/Diarios`, asignaturaData)
  }

  /**
   * Metodo que elimina un diario
   */
  deleteD(id: number): Observable<IDiario> {
    return this._http.delete<IDiario>(`${environment.base_url}/Diarios/${id}`)
  }

  getEvaluacionList(): Observable<IEvaluacion[]>{
    return this._http.get<IEvaluacion[]>(`${environment.base_url}/Evaluacions`)
  }

  registerE(evaluacionData: IEvaluacion): Observable<IEvaluacion> {
    return this._http.post<IEvaluacion>(`${environment.base_url}/Evaluacions/create`, evaluacionData)
  }

  updateE(evaluacionData: IEvaluacion): Observable<IEvaluacion> {
    return this._http.put<IEvaluacion>(`${environment.base_url}/Evaluacions`, evaluacionData)
  }

  deleteE(id: number): Observable<IEvaluacion> {
    return this._http.delete<IEvaluacion>(`${environment.base_url}/Evaluacions/${id}`)
  }
}
