import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAlumno, ICurso, IProfesor, ITutor } from 'src/app/interfaces/interfaces';
import { MaterialService } from 'src/app/services/material.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-alumno-crud',
  templateUrl: './alumno-crud.component.html',
  styleUrls: ['./alumno-crud.component.css']
})
export class AlumnoCrudComponent implements OnInit {

  public form: FormGroup;
  public submitted = false;
  // public tutors: ITutor[] = [];
  // public profesors: IProfesor[] = [];
  public cursos: ICurso[] = [];

  public roles = [ 'Alumno'];

  @Input() alumno: IAlumno;
  @Input() showModal: boolean;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Output() newAlumno: EventEmitter<IAlumno> = new EventEmitter();

  constructor(
    private _usersService: UsersService,
    private _formBuilder: FormBuilder,
    private _materialService: MaterialService
  ) { }

  ngOnInit(): void {
    this.createForm();
    // this.getTutorList();
    // this.getProfesorList();
    this.getCursoList();
  }

  // getTutorList(){
  //   this._usersService.getTutorList().subscribe(
  //     (resp) => {
  //       this.tutors = resp;
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  // getProfesorList(){
  //   this._usersService.getProfesorList().subscribe(
  //     (resp) => {
  //       this.profesors = resp;
  //     },
  //     (err) => {
  //       console.log(err);
  //     }
  //   );
  // }

  getCursoList(){
    this._materialService.getCursoList().subscribe(
      (resp) => {
        this.cursos = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  closeModal() {
    this.form.reset({ password: 'Salesianas1' });
    this.submitted = false;
    this.close.emit(false);
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;

    const fields = this.form.value;

    // fields.tutor = this.tutors.find((p) => p.id == fields.tutor);
    // fields.profesor = this.profesors.find((p) => p.id == fields.profesor);
    fields.curso = this.cursos.find((p) => p.id == fields.curso);

    if (this.alumno.id) {
      this.update(fields);
    } else {
      this.register(fields);
    }
  }

  register(values: any) {

    const alumnoData: IAlumno = values;

    this._usersService.registerA(alumnoData).subscribe(
      (resp) => {
        this.newAlumno.emit(resp);
        this.closeModal()
      },
      (err) => {
        console.log(err);
      }
    );
  }

  update(values: any) {

    const { password, ...fields } = values;

    const alumnoData: IAlumno = JSON.parse(JSON.stringify(this.alumno));

    Object.assign(alumnoData, fields)

    this._usersService.updateA(alumnoData).subscribe(
      (resp) => {
        this.newAlumno.emit(resp);
        this.closeModal()
      },
      (err) => {
        console.log(err);
      }
    );
  }

  createForm() {
    this.form = this._formBuilder.group({
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(45),
          Validators.minLength(2),
        ],
      ],
      lastname: [
        '',
        [
          Validators.required,
          Validators.maxLength(70),
          Validators.minLength(2),
        ],
      ],
      email: ['', [Validators.required, Validators.email]],
      role: ['', [Validators.required]],
      password: [
        'Salesianas1',
        [
          Validators.required,
          Validators.pattern(/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S*$/),
        ],
      ],
      // tutor: ['', [Validators.required]],
      // profesor: ['', [Validators.required]],
      curso: ['', [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }

  public errorMessages = {
    name: [
      { type: 'required', message: 'The name is required' },
      { type: 'maxlength', message: 'Maximum 45 characters' },
      { type: 'minlength', message: 'Minimun 2 characters' },
    ],
    lastname: [
      { type: 'required', message: 'The name is required' },
      { type: 'maxlength', message: 'Maximum 70 characters' },
      { type: 'minlength', message: 'Minimun 2 characters' },
    ],
    email: [
      { type: 'required', message: 'The email is required' },
      { type: 'email', message: 'Must be a valid email' },
    ],
    role: [{ type: 'required', message: 'The role is required' }],
    password: [
      { type: 'required', message: 'The password is required' },
      {
        type: 'pattern',
        message:
          'Password must contain at least one lowercase letter, one uppercase letter, and one number',
      },
    ],
    // tutor: [{ type: 'required', message: 'Choose one' }],
    // profesor: [{ type: 'required', message: 'Choose one' }],
    curso: [{ type: 'required', message: 'Choose one' }],
  };

}
