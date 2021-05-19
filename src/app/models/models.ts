import { IAlumno, IAsignaturas, ICurso, IProfesor, ITutor } from "../interfaces/interfaces";

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
    public id: number;
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
    id: number;
    name: string;
    lastname: string;
    email: string;
    role: string;
    curso: ICurso;
    profesor: IProfesor;
    tutor: ITutor;

    constructor(
        id: number = null,
        name: string = null,
        lastname: string = null,
        email: string = null,
        role: string = null,
        curso : ICurso = { id: null, name: null, numero: null, asignaturas: null, alumno: null},
        profesor: IProfesor = { id: null, name: null, lastname: null, email: null, role: null},
        tutor: ITutor = { id: null, name: null, lastname: null, email: null, nombreEmpresa: null, role: null},
    ){ 
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.role = role;
        this.curso = curso;
        this.profesor = profesor;
        this.tutor = tutor;
    }
}

export class Curso implements ICurso{
    id: number;
    numero: number;
    name: string;
    asignaturas: IAsignaturas[];
    alumno: IAlumno[];

    constructor(
        id: number = null,
        numero: number = null,
        name: string = null,  
        asignaturas: IAsignaturas = { id: null, name: null, codigo: null, profesor: null},
        alumno: IAlumno = { id: null, name: null, lastname: null, email: null, role: null, curso: null, tutor: null, profesor: null},
    ){
        this.id = id;
        this.numero = numero;
        this.name = name;
    }
}

export class Asignaturas implements IAsignaturas{
    id: number;
    codigo: number;
    name: string;
    profesor: IProfesor;

    constructor(
        id: number = null,
        codigo: number = null,
        name: string = null,  
        profesor: IProfesor = { id: null, name: null, lastname: null, email: null, role: null},
    ){
        this.id = id;
        this.codigo = codigo;
        this.name = name;
        this.profesor = profesor;
    }
}

    
