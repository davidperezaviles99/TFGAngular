import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IEquipoMensaje, IMensaje, IMessage } from '../interfaces/interfaces';

@Injectable({
  providedIn: 'root'
})
export class MensajeService {

  constructor(private _http: HttpClient, private router: Router) { }

  /**
   * Metodo que trae la lista de mensajes
   * @returns 
   */
  getMensajeList(): Observable<IMensaje[]>{
    return this._http.get<IMensaje[]>(`${environment.base_url}/Mensajes`)
  }

  /**
   * Metodo que trae la lista de los mensajes de un equipo por su id
   */
  getEquipoMensajeID(id: number){
    return this._http.get<IMensaje[]>(`${environment.base_url}/Mensajes/getEquipoMensaje/${id}`)
  }

  /**
   * Metodo que obtiene la lista de mensaje de un usuario
   * @param id 
   * @returns 
   */
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
    return this._http.delete<IMensaje>(`${environment.base_url}/Messages/${id}`)
  }

  /**
   * Metodo que crea un mensaje
   * @param message 
   * @returns 
   */
  createMessage(message: IMessage) {
    return this._http.post<IMessage>(
      `${environment.base_url}/Messages`,
      message
    );
  }

  /**
   * Metodo que mete el mensaje en la tabla equipomensaje
   * @param equipoMensaje 
   * @returns 
   */
  updateOperatorDemandMessage(equipoMensaje: IEquipoMensaje) {
    return this._http.post<IEquipoMensaje>(
      `${environment.base_url}/Equipos/EquipoMensaje`,
      equipoMensaje
    );
  }

  /**
   * Metodo que obtiene la lista equipo mensaje
   * @param id 
   * @returns 
   */
  getEquipoMensajeList(id: number) {
    return this._http
      .get<IEquipoMensaje[]>(
        `${environment.base_url}/Equipos/getEquipoMensajeList/${id}`
      )
      .pipe(tap((resp) => resp.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())));
  }



}
