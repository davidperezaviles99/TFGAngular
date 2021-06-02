import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAsignaturas, IProfesor } from 'src/app/interfaces/interfaces';
import { MaterialService } from 'src/app/services/material.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-asignatura-crud',
  templateUrl: './asignatura-crud.component.html',
  styleUrls: ['./asignatura-crud.component.css']
})
export class AsignaturaCrudComponent implements OnInit {
  public form: FormGroup;
  public submitted = false;
  
  public profesors: IProfesor[] = [];

  @Input() asignatura: IAsignaturas;
  @Input() showModal: boolean;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Output() newAsignatura: EventEmitter<IAsignaturas> = new EventEmitter();
  
  constructor(private _usersService: UsersService,
    private _formBuilder: FormBuilder,
    private _materialService: MaterialService) { }

  ngOnInit(): void {
    this.createForm();
    this.getProfesorList();
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

  closeModal() {
    this.form.reset();
    this.submitted = false;
    this.close.emit(false);
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;

    const fields = this.form.value;

    fields.profesor = this.profesors.find((p) => p.id == fields.profesor);

    if (this.asignatura.id) {
      this.update(fields);
    } else {
      this.register(fields);
    }
  }

  register(values: any) {

    const asignaturaData: IAsignaturas = values;

    this._materialService.registerAs(asignaturaData).subscribe(
      (resp) => {
        this.newAsignatura.emit(resp);
        this.closeModal()
      },
      (err) => {
        console.log(err);
      }
    );
  }

    update(values: any) {

      const { ...fields } = values;

    const asignaturaData: IAsignaturas = JSON.parse(JSON.stringify(this.asignatura));

    Object.assign(asignaturaData, fields)
    this._materialService.updateAs(asignaturaData).subscribe(
      (resp) => {
        this.newAsignatura.emit(resp);
        this.closeModal()
      },
      (err) => {
        console.log(err);
      }
    );
  }

  createForm() {
    this.form = this._formBuilder.group({
      codigo: [
        '',
        [
          Validators.required,
          Validators.maxLength(3),
        ],
      ],
      name: [
        '',
        [
          Validators.required,
          Validators.maxLength(70),
          Validators.minLength(2),
        ],
      ],
      profesor: ['', [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }

  public errorMessages = {
    codigo: [
      { type: 'required', message: 'The Code is required' },
      { type: 'maxlength', message: 'Maximum 3 characters' },
    ],
    name: [
      { type: 'required', message: 'The name is required' },
      { type: 'maxlength', message: 'Maximum 70 characters' },
      { type: 'minlength', message: 'Minimun 2 characters' },
    ],
    profesor: [{ type: 'required', message: 'Choose one' }],
  };

}
