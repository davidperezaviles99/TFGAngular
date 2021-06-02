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

  getDiarioList(): Observable<IDiario[]>{
    return this._http.get<IDiario[]>(`${environment.base_url}/Diarios`)
  }

  getDiarioID(id: number): Observable<IDiario>{
    return this._http.get<IDiario>(`${environment.base_url}/Diarios/${id}`)
  }

  getDiarios(id: number) {
    return this._http.get<IDiario[]>(`${environment.base_url}/Diarios/getUserDiario/${id}`
    )
    .pipe(tap((resp) => resp.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())));
  }

  getEquipoDiarioID(id: number) {
    return this._http.get<IDiario[]>(`${environment.base_url}/Diarios/getEquipoDiario/${id}`)
  }

  registerD(asignaturaData: IDiario): Observable<IDiario> {
    return this._http.post<IDiario>(`${environment.base_url}/Diarios/create`, asignaturaData)
  }

  updateD(asignaturaData: IDiario): Observable<IDiario> {
    return this._http.put<IDiario>(`${environment.base_url}/Diarios`, asignaturaData)
  }

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

  getEvaluacion(): IEvaluacion {
    return JSON.parse(localStorage.getItem('evaluacion'))
  }
}
