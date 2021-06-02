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

    login(userData: ILogin): Observable<IUser> {
      return this._http
        .post<IUser>(`${environment.base_url}/Users/login`, userData)
        .pipe( tap ((resp => {
          localStorage.setItem('user', JSON.stringify(resp))
        })));
    }

    getUser(): IUser {
        return JSON.parse(localStorage.getItem('user'))
    }

    getUserList(): Observable<IUser[]> {
      return this._http.get<IUser[]>(`${environment.base_url}/Users`)
    }

    updateU(userData: IUser): Observable<IUser> {
      return this._http.put<IUser>(`${environment.base_url}/Users`, userData)
    }

   registerP(profesorData: IProfesor): Observable<IProfesor> {
    return this._http.post<IProfesor>(`${environment.base_url}/Profesors/create`, profesorData)
  }

  updateP(profesorData: IProfesor): Observable<IProfesor> {
    return this._http.put<IProfesor>(`${environment.base_url}/Profesors`, profesorData)
  }

  deleteP(id: number): Observable<IProfesor> {
    return this._http.delete<IProfesor>(`${environment.base_url}/Profesors/${id}`)
  }
  
  getProfesorList(): Observable<IProfesor[]> {
    return this._http.get<IProfesor[]>(`${environment.base_url}/Profesors`)
  }

  getProfesor(): IProfesor {
    return JSON.parse(localStorage.getItem('profesor'))
  }

  //Tutor
  registerT(tutorData: ITutor): Observable<ITutor> {
    return this._http.post<ITutor>(`${environment.base_url}/Tutors/create`, tutorData)
  }

  updateT(tutorData: ITutor): Observable<ITutor> {
    return this._http.put<ITutor>(`${environment.base_url}/Tutors`, tutorData)
  }

  deleteT(id: number): Observable<ITutor> {
    return this._http.delete<ITutor>(`${environment.base_url}/Tutors/${id}`)
  }
  
  getTutorList(): Observable<ITutor[]> {
    return this._http.get<ITutor[]>(`${environment.base_url}/Tutors`)
  }

  getTutor(): ITutor {
    return JSON.parse(localStorage.getItem('tutor'))
  }

  //Alumno
  registerA(alumnoData: IAlumno): Observable<IAlumno> {
    return this._http.post<IAlumno>(`${environment.base_url}/Alumnos/create`, alumnoData)
  }

  updateA(alumnoData: IAlumno): Observable<IAlumno> {
    return this._http.put<IAlumno>(`${environment.base_url}/Alumnos`, alumnoData)
  }

  deleteA(id: number): Observable<IAlumno> {
    return this._http.delete<IAlumno>(`${environment.base_url}/Alumnos/${id}`)
  }
  
  getAlumnoList(): Observable<IAlumno[]> {
    return this._http.get<IAlumno[]>(`${environment.base_url}/Alumnos`)
  }

  getAlumno(): IAlumno {
    return JSON.parse(localStorage.getItem('alumno'))
  }
   
  logout() {
    localStorage.clear()
    this.router.navigateByUrl('/login')
  }
}