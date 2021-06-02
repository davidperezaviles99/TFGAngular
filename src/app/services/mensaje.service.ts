import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IDiario, IMensaje } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor(private _http: HttpClient, private router: Router) { }

  getMensajeList(): Observable<IMensaje[]>{
    return this._http.get<IMensaje[]>(`${environment.base_url}/Mensajes`)
  }

  getEquipoMensajeID(id: number): Observable<IMensaje>{
    return this._http.get<IMensaje>(`${environment.base_url}/Mensajes/getEquipoMensaje/${id}`)
  }

  getMensajes(id: number) {
    return this._http.get<IMensaje[]>(`${environment.base_url}/Mensajes/getUserMensaje/${id}`)
  }

  registerM(mensajeData: IMensaje): Observable<IMensaje> {
    return this._http.post<IMensaje>(`${environment.base_url}/Mensajes/create`, mensajeData)
  }

  updateM(mensajeData: IMensaje): Observable<IMensaje> {
    return this._http.put<IMensaje>(`${environment.base_url}/Mensajes`, mensajeData)
  }

  deleteM(id: number): Observable<IMensaje> {
    return this._http.delete<IMensaje>(`${environment.base_url}/Mensajes/${id}`)
  }

  getMensaje(): IMensaje {
    return JSON.parse(localStorage.getItem('diario'))
  }
}
