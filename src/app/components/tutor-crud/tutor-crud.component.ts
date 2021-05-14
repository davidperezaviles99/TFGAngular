import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAlumno, IProfesor, ITutor } from 'src/app/interfaces/interfaces';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-tutor-crud',
  templateUrl: './tutor-crud.component.html',
  styleUrls: ['./tutor-crud.component.css']
})
export class TutorCrudComponent implements OnInit {

  public form: FormGroup;
  public submitted = false;
  public profesors: IProfesor[] = [];
  public alumnos: IAlumno[] = [];

  public roles = ['Tutor'];

  @Input() tutor: ITutor;
  @Input() showModal: boolean;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Output() newTutor: EventEmitter<ITutor> = new EventEmitter();

  constructor(
    private _usersService: UsersService,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createForm();
    this.getProfesorList();
    this.getAlumnoList();
  }

  getProfesorList(){
    this._usersService.getProfesorList().subscribe(
      (resp) => {
        this.profesors = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getAlumnoList(){
    this._usersService.getAlumnoList().subscribe(
      (resp) => {
        this.alumnos = resp;
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

    if (this.tutor.id) {
      this.update(fields);
    } else {
      this.register(fields);
    }
  }

  register(values: any) {
    const profesors: IProfesor[] = [];
    const alumnos: IAlumno[] = [];

    for (const profesorid of values.profesor) {
     profesors.push(this.profesors.find((l) => l.id == profesorid))
    }
    values.profesor = profesors;

    for (const alumnoid of values.alumno) {
      alumnos.push(this.alumnos.find((l) => l.id == alumnoid))
     }
     values.alumno = alumnos;
    
    if(values.profesor == 0){
      delete values.profesor
    }

    if(values.alumno == 0){
      delete values.alumno
    }

    const tutorData: ITutor = values;

    this._usersService.registerT(tutorData).subscribe(
      (resp) => {
        this.newTutor.emit(resp);
        this.closeModal()
      },
      (err) => {
        console.log(err);
      }
    );
  }

  update(values: any) {

    values.profesor = this.profesors.find((l) => l.id == values.profesor);
    values.alumno = this.alumnos.find((l) => l.id == values.alumno);

    const { password, ...fields } = values;

    const tutorData: ITutor = JSON.parse(JSON.stringify(this.tutor));

    Object.assign(tutorData, fields)

    this._usersService.updateT(tutorData).subscribe(
      (resp) => {
        this.newTutor.emit(resp);
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
      profesor: ['', [Validators.required]],
      alumno: ['', [Validators.required]],
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
    alumno: [{ type: 'required', message: 'Choose one' }],
    profesor: [{ type: 'required', message: 'Choose one' }],
  };

}
