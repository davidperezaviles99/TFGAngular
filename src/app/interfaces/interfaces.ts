export interface ILogin {
    email: string;
    password: string;
}

export interface IUser {
    id: string;
    name: string;
    lastname: string;
    email: string;
    role: string;
}

export interface IProfesor {
    id: number;
    name: string;
    lastname: string;
    email: string;
    role: string;
}

export interface ITutor {
    id: number;
    name: string;
    lastname: string;
    nombreEmpresa: string;
    email: string;
    role: string;
}

export interface IAlumno{
    id: number;
    name: string;
    lastname: string;
    email: string;
    role: string;
    curso: ICurso;
    profesor: IProfesor;
    tutor: ITutor;
}

export interface ICurso{
    id: number;
    numero: number;
    name: string;
    asignaturas: IAsignaturas[];
    alumno: IAlumno[];
}

export interface IAsignaturas{
    id: number;
    codigo: number;
    name: string;
    profesor: IProfesor;
}