import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IProfesor } from 'src/app/interfaces/interfaces';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profesor-crud',
  templateUrl: './profesor-crud.component.html',
  styleUrls: ['./profesor-crud.component.css']
})
export class ProfesorCrudComponent implements OnInit {

  public form: FormGroup;
  public submitted = false;

  public roles = [ 'Profesor'];

  @Input() profesor: IProfesor;
  @Input() showModal: boolean;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Output() newProfesor: EventEmitter<IProfesor> = new EventEmitter();

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
   * Metodo que envia el profesor completado al metodo de registrar o actualizar
   * @returns Profesor Completado
   */
  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;

    const fields = this.form.value;

    if (this.profesor.id) {
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

    const profesorData: IProfesor = values;

    this._usersService.registerP(profesorData).subscribe(
      (resp) => {
        this.newProfesor.emit(resp);
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

    const { password, ...fields } = values;

    const profesorData: IProfesor = JSON.parse(JSON.stringify(this.profesor));

    Object.assign(profesorData, fields)

    this._usersService.updateP(profesorData).subscribe(
      (resp) => {
        this.newProfesor.emit(resp);
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
  };

}
