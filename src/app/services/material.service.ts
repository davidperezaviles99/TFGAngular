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

  //Curso
  getCursoList(): Observable<ICurso[]>{
    return this._http.get<ICurso[]>(`${environment.base_url}/Cursos`)
  }

  registerC(cursoData: ICurso): Observable<ICurso> {
    return this._http.post<ICurso>(`${environment.base_url}/Cursos/create`, cursoData)
  }

  updateC(cursoData: ICurso): Observable<ICurso> {
    return this._http.put<ICurso>(`${environment.base_url}/Cursos`, cursoData)
  }

  deleteC(id: number): Observable<ICurso> {
    return this._http.delete<ICurso>(`${environment.base_url}/Cursos/${id}`)
  }

  getCurso(): ICurso {
    return JSON.parse(localStorage.getItem('curso'))
  }


  //Asignaturas
  getAsignaturaList(): Observable<IAsignaturas[]>{
    return this._http.get<IAsignaturas[]>(`${environment.base_url}/Asignaturas`)
  }

  registerAs(asignaturaData: IAsignaturas): Observable<IAsignaturas> {
    return this._http.post<IAsignaturas>(`${environment.base_url}/Asignaturas/create`, asignaturaData)
  }

  updateAs(asignaturaData: IAsignaturas): Observable<IAsignaturas> {
    return this._http.put<IAsignaturas>(`${environment.base_url}/Asignaturas`, asignaturaData)
  }

  deleteAs(id: number): Observable<IAsignaturas> {
    return this._http.delete<IAsignaturas>(`${environment.base_url}/Asignaturas/${id}`)
  }

  getAsignatura(): IAsignaturas {
    return JSON.parse(localStorage.getItem('asignatura'))
  }
}
