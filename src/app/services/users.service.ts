import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { IAlumno, ILogin, IProfesor, ITutor, IUser } from '../interfaces/interfaces';

@Injectable({
    providedIn: 'root',
})

export class UsersService {

    constructor(private _http: HttpClient, private router: Router) {}

    /**
     * Metodo de login de la aplicaion
     * @param userData 
     * @returns 
     */
    login(userData: ILogin): Observable<IUser> {
      return this._http
        .post<IUser>(`${environment.base_url}/Users/login`, userData)
        .pipe( tap ((resp => {
          localStorage.setItem('user', JSON.stringify(resp))
        })));
    }

    /**
     * Metodo que obtiene el usuario del localstorage
     * @returns 
     */
    getUser(): IUser {
        return JSON.parse(localStorage.getItem('user'))
    }

    /**
     * Metodo que obtiene la lista de usuarios
     * @returns 
     */
    getUserList(): Observable<IUser[]> {
      return this._http.get<IUser[]>(`${environment.base_url}/Users`)
    }

    /**
     * Metodo que actualiza el usuario
     * @param userData 
     * @returns 
     */
    updateU(userData: IUser): Observable<IUser> {
      return this._http.put<IUser>(`${environment.base_url}/Users`, userData)
    }

    /**
     * Metodo que registra el profesor
     * @param profesorData 
     * @returns 
     */
   registerP(profesorData: IProfesor): Observable<IProfesor> {
    return this._http.post<IProfesor>(`${environment.base_url}/Profesors/create`, profesorData)
  }

  /**
   * Metodo que actualiza el profesor
   * @param profesorData 
   * @returns 
   */
  updateP(profesorData: IProfesor): Observable<IProfesor> {
    return this._http.put<IProfesor>(`${environment.base_url}/Profesors`, profesorData)
  }

  /**
   * Metodo que borra el profesor
   * @param id 
   * @returns 
   */
  deleteP(id: number): Observable<IProfesor> {
    return this._http.delete<IProfesor>(`${environment.base_url}/Profesors/${id}`)
  }
  
  /**
   * Metodo que trae la lista de profesores
   * @returns 
   */
  getProfesorList(): Observable<IProfesor[]> {
    return this._http.get<IProfesor[]>(`${environment.base_url}/Profesors`)
  }

  getProfesor(): IProfesor {
    return JSON.parse(localStorage.getItem('profesor'))
  }

  /**
   * Metodo que registra el tutor
   * @param tutorData 
   * @returns 
   */
  registerT(tutorData: ITutor): Observable<ITutor> {
    return this._http.post<ITutor>(`${environment.base_url}/Tutors/create`, tutorData)
  }
/**
 * Metodo que actualiza el tutor
 */
  updateT(tutorData: ITutor): Observable<ITutor> {
    return this._http.put<ITutor>(`${environment.base_url}/Tutors`, tutorData)
  }

  /**
   * Metodo que borra el tutor
   * @param id 
   * @returns 
   */
  deleteT(id: number): Observable<ITutor> {
    return this._http.delete<ITutor>(`${environment.base_url}/Tutors/${id}`)
  }
  
  /**
   * Obtiene la lista de Tutores
   * @returns 
   */
  getTutorList(): Observable<ITutor[]> {
    return this._http.get<ITutor[]>(`${environment.base_url}/Tutors`)
  }

  getTutor(): ITutor {
    return JSON.parse(localStorage.getItem('tutor'))
  }

  /**
   * Metodo que registra un alumno
   * @param alumnoData 
   * @returns 
   */
  registerA(alumnoData: IAlumno): Observable<IAlumno> {
    return this._http.post<IAlumno>(`${environment.base_url}/Alumnos/create`, alumnoData)
  }

  /**
   * Metodo que actualiza el alumno
   * @param alumnoData 
   * @returns 
   */
  updateA(alumnoData: IAlumno): Observable<IAlumno> {
    return this._http.put<IAlumno>(`${environment.base_url}/Alumnos`, alumnoData)
  }

  /**
   * Metodo que borra un alumno
   * @param id 
   * @returns 
   */
  deleteA(id: number): Observable<IAlumno> {
    return this._http.delete<IAlumno>(`${environment.base_url}/Alumnos/${id}`)
  }
  
  /**
   * Metodo que trae la lista de alumnos
   * @returns 
   */
  getAlumnoList(): Observable<IAlumno[]> {
    return this._http.get<IAlumno[]>(`${environment.base_url}/Alumnos`)
  }

  getAlumno(): IAlumno {
    return JSON.parse(localStorage.getItem('alumno'))
  }
   
  /**
   * Metodo que sale de la aplicacion 
   * Y limpia el localstorage
   */
  logout() {
    localStorage.clear()
    this.router.navigateByUrl('/login')
  }
}