import { IAlumno, IProfesor, ITutor } from "../interfaces/interfaces";

export class Profesor implements IProfesor{
    id: number;
    name: string;
    lastname: string;
    email: string;
    role: string;

    constructor(
        id: number = null,
        name: string = null,
        lastname: string = null,
        email: string = null,
        role: string = null,
    ){
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.role = role;
    }
}

export class Tutor implements ITutor{
    public id?: number;
    public name: string;
    public lastname: string;
    public nombreEmpresa: string;
    public email: string;
    public role: string;


    constructor(
        id: number = null,
        name: string = null,
        lastname: string = null,
        nombreEmpresa: string = null,
        email: string = null,
        role: string = null,
    ){
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.nombreEmpresa = nombreEmpresa;
        this.email = email;
        this.role = role;
    } 
}

export class Alumno implements IAlumno{
    id?: number;
    name: string;
    lastname: string;
    email: string;
    role: string;
    //curso: ICurso;

    constructor(
        id: number = null,
        name: string = null,
        lastname: string = null,
        email: string = null,
        role: string = null,
        //tutor: ITutor = { id: null, name: null, lastname: null, email: null, role: null, alumno: null},
    ){ 
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.role = role;
        //this.curso = curso;
    }
}

    
