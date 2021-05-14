import { InputDecorator } from "@angular/core";

export interface ILogin {
    email: string;
    password: string;
}

export interface IUser {
    id?: string;
    name: string;
    lastname: string;
    email: string;
    role: string;
}

export interface IProfesor {
    id?: number;
    name: string;
    lastname: string;
    email: string;
    role: string;
    tutor: ITutor[];
}

export interface ITutor {
    id?: number;
    name: string;
    lastname: string;
    email: string;
    role: string;
    profesor: IProfesor[];
    alumno: IAlumno[];
}

export interface IAlumno{
    id?: number;
    name: string;
    lastname: string;
    email: string;
    role: string;
    tutor: ITutor;
}