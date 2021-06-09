import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ITutor } from 'src/app/interfaces/interfaces';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-tutor-crud',
  templateUrl: './tutor-crud.component.html',
  styleUrls: ['./tutor-crud.component.css']
})
export class TutorCrudComponent implements OnInit {

  public form: FormGroup;
  public submitted = false;

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
  }

  /**
   * Metodo que cierra el Modal y le mete la contraseña automaticamente
   */
  closeModal() {
    this.form.reset({ password: 'Salesianas1' });
    this.submitted = false;
    this.close.emit(false);
  }

    /**
   * Metodo que envia el tutor completado al metodo de registrar o actualizar
   * @returns Tutor Completado
   */
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

  /**
   * Metodo que registrar el objeto
   * @param values 
   */
  register(values: any) {

    // const alumnos: IAlumno[] = [];

    // for (const alumnoid of values.alumno) {
    //   alumnos.push(this.alumnos.find((l) => l.id == alumnoid))
    //  }
    //  values.alumno = alumnos;

    // if(values.alumno == 0){
    //   delete values.alumno
    // }

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

  /**
   * Metodo que actualiza el objeto
   * @param values
   */
  update(values: any) {

    // values.alumno = this.alumnos.find((l) => l.id == values.alumno);

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

  /**
   * Metodo que crea el formulario cumpliendo
   * una seria de validaciones estipuladas
   */
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
      nombreEmpresa: [
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
    nombreEmpresa: [
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
    //alumno: [{ type: 'required', message: 'Choose one' }],
  };

}
