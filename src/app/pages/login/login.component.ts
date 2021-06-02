import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ILogin } from '../../interfaces/interfaces';
import { UsersService } from 'src/app/services/users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public form: FormGroup;
  public submitted = false;

  constructor(
    private _formBuilder: FormBuilder, 
    private _router: Router,
    private _usersService: UsersService,) { }

  ngOnInit(): void {
    if(this._usersService.getUser() != null) {
      this._router.navigateByUrl('/home')
    }
    this.createForm()
  }

  createForm() {
    this.form = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;

    const operatorData: ILogin = this.form.value;

    this._usersService.login(operatorData).subscribe(
      () => {
        this.submitted = false;
        this.form.reset();
        this._router.navigateByUrl('/home')
      },
      (err) => {
        console.log(err);
        Swal.fire({
          icon: 'error',
          titleText: 'error',
          text: `Credenciales incorrectas`,
          showCancelButton: false,
          showConfirmButton: true,
          confirmButtonText: 'Ok',
          confirmButtonColor: '#17a2b8'
        })
      }
    );
  }

  get f() {
    return this.form.controls;
  }

  public errorMessages = {
    email: [
      { type: 'required', message: 'The email is required' },
      { type: 'email', message: 'Must be a valid email' },
    ],
    password: [{ type: 'required', message: 'The password is required' }],
  };

}
