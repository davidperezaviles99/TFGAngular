import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IUser } from 'src/app/interfaces/interfaces';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-profile-crud',
  templateUrl: './profile-crud.component.html',
  styleUrls: ['./profile-crud.component.css']
})
export class ProfileCrudComponent implements OnInit {

  public form: FormGroup;
  public submitted = false;

  @Input() user: IUser;
  @Input() showModal: boolean;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Output() newUser: EventEmitter<IUser> = new EventEmitter();
  
  constructor(
    private _usersService: UsersService,
    private _formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.createForm();
  }

  /**
   * Metodo que cierra el Modal
   */
  closeModal() {
    this.form.reset();
    this.submitted = false;
    this.close.emit(false);
  }

  /**
   * Metodo que envia el usuario completado al metodo de actualizar
   * @returns Perfil Completado
   */
  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;

    const fields = this.form.value;

    if (this.user.id) {
      this.update(fields);
    }
  }

    /**
   * Metodo que actualiza el objeto
   * @param values
   */
  update(values: any) {

    const { ...fields } = values;

    const userData: IUser = JSON.parse(JSON.stringify(this.user));

    Object.assign(userData, fields)

    this._usersService.updateU(userData).subscribe(
      (resp) => {
        this.newUser.emit(resp);
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
      password: [
        '',
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
