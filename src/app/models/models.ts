import { IAlumno, IAsignaturas, ICurso, IDiario, IEquipo, IEvaluacion, IMensaje, IProfesor, ITutor, IUser } from "../interfaces/interfaces";

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
    evaluacionT: string;
    evaluacionP: string;
    user: IUser;
    equipo: IEquipo;
    asignatura: IAsignaturas;
    constructor(
        id: number = null,
        date: Date = null,
        horas: number = null,
        descripcion: string = null,
        link: string = null,
        evaluacionT: string = null,
        evaluacionP: string = null,
        user: IUser = { id: null, name: null, lastname: null, email: null, password: null,role: null},
        equipo: IEquipo = { id: null, alumnoId: null, profesor: null, tutor: null},
        asignatura: IAsignaturas = { id: null, name: null, codigo: null, profesor: null},
    ){
        this.id = id;
        this.date = date;
        this.horas = horas;
        this.descripcion = descripcion;
        this.link = link;
        this.evaluacionT = evaluacionT;
        this.evaluacionP = evaluacionP;
        this.user = user;
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

export class User implements IUser{
    id: number;
    name: string;
    lastname: string;
    email: string;
    password: string;
    role: string;

    constructor(
        id: number = null,
        name: string = null,
        lastname: string = null,
        email: string = null,
        password: string = null,
        role: string = null,
    ){
        this.id = id;
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
        this.role = role;
    }
}

export class Mensaje implements IMensaje{
    id: number;
    comentario: string;
    asunto: string;
    name: string;
    equipo: IEquipo;
    user: IUser;
    constructor(
        id: number = null,
        comentario: string = null,
        asunto: string = null,
        name: string = null,
        equipo: IEquipo = { id: null, alumnoId: null, profesor: null, tutor: null},
        user: IUser = { id: null, name: null, lastname: null, email: null, password: null, role: null},
    ){
        this.id = id;
        this.comentario = comentario;
        this.asunto = asunto;
        this.name = name;
        this.equipo = equipo;
        this.user = user;        
    }
    
}

export class Equipo implements IEquipo{
    id?: number;
    alumnoId: number;
    alumno?: IAlumno;
    tutor?: ITutor;
    profesor?: IProfesor;
    constructor(
        id: number = null,
        alumnoId: number = null,
        alumno: IAlumno = { id: null, name: null, lastname: null, email: null, role: null, curso: null},
        tutor: ITutor = { id: null, name: null, lastname: null, email: null, nombreEmpresa: null, role: null},
        profesor: IProfesor = { id: null, name: null, lastname: null, email: null, role: null},
    ){
        this.id = id;
        this.alumnoId = alumnoId;
        this.alumno = alumno;
        this.tutor = tutor;
        this.profesor = profesor;
        
    }
}

    
