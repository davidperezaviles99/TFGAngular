// import { HttpClient } from '@angular/common/http';
// import { Injectable } from '@angular/core';
// import { environment } from 'src/environments/environment';
// import { IProfesor, ITutor } from '../interfaces/interfaces';

// @Injectable({
//   providedIn: 'root'
// })
// export class ProfesorTutorService {

//   constructor(private _http: HttpClient) { }

//   getProfesor(){
//     return this._http.get<IProfesor[]>(`${environment.base_url}/ProfesorTutors/Profesors`)
//   }

//   getTutor(){
//     return this._http.get<ITutor[]>(`${environment.base_url}/ProfesorTutors/Tutors`)
//   }

//   getProfesorByID(id: number) {
//     return this._http.get<IProfesorTutor[]>(`${environment.base_url}/ProfesorTutors/Profesors/${id}`)
//   }

//   asignarProfesor(profesorTutor: IProfesorTutor){
//     return this._http.post<IProfesorTutor>(`${environment.base_url}/ProfesorTutors/AsignarProfesor`, profesorTutor)
//   }

//   asignarTutor(profesorTutor: IProfesorTutor){
//     return this._http.post<IProfesorTutor>(`${environment.base_url}/ProfesorTutors/AsignarTutor`, profesorTutor)
//   }

//   delete(profesorTutor: IProfesorTutor) {
//     return this._http.post<IProfesorTutor>(`${environment.base_url}/ProfesorTutors/DeleteProfesorTutor`, profesorTutor)
//   }
// }
