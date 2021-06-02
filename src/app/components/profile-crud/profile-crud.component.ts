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

  closeModal() {
    this.form.reset();
    this.submitted = false;
    this.close.emit(false);
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;

    const fields = this.form.value;

    if (this.user.id) {
      this.update(fields);
    }
  }

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
  };
}
