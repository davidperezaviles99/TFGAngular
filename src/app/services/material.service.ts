import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IAsignaturas, ICurso } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MaterialService {

  constructor(private _http: HttpClient, private router: Router) {}

  /**
   * Metodo que trae la lista de cursos
   * @returns 
   */
  getCursoList(): Observable<ICurso[]>{
    return this._http.get<ICurso[]>(`${environment.base_url}/Cursos`)
  }

  /**
   * Metodo que registra un curso
   * @param cursoData 
   * @returns 
   */
  registerC(cursoData: ICurso): Observable<ICurso> {
    return this._http.post<ICurso>(`${environment.base_url}/Cursos/create`, cursoData)
  }

  /**
   * Metodo que actualiza un curso
   * @param cursoData 
   * @returns 
   */
  updateC(cursoData: ICurso): Observable<ICurso> {
    return this._http.put<ICurso>(`${environment.base_url}/Cursos`, cursoData)
  }

  /**
   * Metodo que elimina un curso
   * @param id 
   * @returns 
   */
  deleteC(id: number): Observable<ICurso> {
    return this._http.delete<ICurso>(`${environment.base_url}/Cursos/${id}`)
  }

  /**
   * Metodo que trae la lista de asignaturas
   * @returns 
   */
  getAsignaturaList(): Observable<IAsignaturas[]>{
    return this._http.get<IAsignaturas[]>(`${environment.base_url}/Asignaturas`)
  }

  /**
   * Metodo que registra las asignaturas
   * @param asignaturaData 
   * @returns 
   */
  registerAs(asignaturaData: IAsignaturas): Observable<IAsignaturas> {
    return this._http.post<IAsignaturas>(`${environment.base_url}/Asignaturas/create`, asignaturaData)
  }

  /**
   * Metodo que actualiza las asignaturas
   * @param asignaturaData 
   * @returns 
   */
  updateAs(asignaturaData: IAsignaturas): Observable<IAsignaturas> {
    return this._http.put<IAsignaturas>(`${environment.base_url}/Asignaturas`, asignaturaData)
  }

  /**
   * Metodo que borra las asignaturas
   * @param id 
   * @returns 
   */
  deleteAs(id: number): Observable<IAsignaturas> {
    return this._http.delete<IAsignaturas>(`${environment.base_url}/Asignaturas/${id}`)
  }

}
