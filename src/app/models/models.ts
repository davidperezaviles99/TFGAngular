import { IAlumno, IAsignaturas, ICurso, IDiario, IEquipo, IEvaluacion, IProfesor, ITutor } from "../interfaces/interfaces";

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
        curso : ICurso = { id: null, name: null, numero: null, asignatura: null},
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
    asignatura: IAsignaturas;

    constructor(
        id: number = null,
        numero: number = null,
        name: string = null,  
        asignatura: IAsignaturas = { id: null, name: null, codigo: null, profesor: null},
    ){
        this.id = id;
        this.numero = numero;
        this.name = name;
        this.asignatura = asignatura;
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

export class Diario implements IDiario{
    id?: number;
    date: Date;
    horas: number;
    descripcion: string;
    link: string;
    equipo: IEquipo;
    asignatura: IAsignaturas;
    constructor(
        id: number = null,
        date: Date = null,
        horas: number = null,
        descripcion: string = null,
        link: string = null,
        equipo: IEquipo = { id: null, alumnoId: null, profesor: null, tutor: null},
        asignatura: IAsignaturas = { id: null, name: null, codigo: null, profesor: null},
    ){
        this.id = id;
        this.date = date;
        this.horas = horas;
        this.descripcion = descripcion;
        this.link = link;
        this.equipo = equipo;
        this.asignatura = asignatura;
    }
    
}

export class Evaluacion implements IEvaluacion{
    id?: number;
    date: Date;
    evaluacionT: string;
    evaluacionP: string;
    equipo: IEquipo;
    constructor(
        id: number = null,
        date: Date = null,
        evaluacionT: string = null,
        evaluacionP: string = null,
        equipo: IEquipo = { id: null, alumnoId: null, profesor: null, tutor: null},
    ){
        this.id = id;
        this.date = date;
        this.evaluacionT = evaluacionT;
        this.evaluacionP = evaluacionP;
        this.equipo = equipo;
    }
}

    
