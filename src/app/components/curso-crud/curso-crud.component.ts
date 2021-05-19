import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAlumno, IAsignaturas, ICurso } from 'src/app/interfaces/interfaces';
import { MaterialService } from 'src/app/services/material.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-curso-crud',
  templateUrl: './curso-crud.component.html',
  styleUrls: ['./curso-crud.component.css']
})
export class CursoCrudComponent implements OnInit {
  public form: FormGroup;
  public submitted = false;

  public alumnos: IAlumno[] = [];
  public asignaturas: IAsignaturas[] = [];

  @Input() curso: ICurso;
  @Input() showModal: boolean;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Output() newCurso: EventEmitter<ICurso> = new EventEmitter();
  
  constructor(private _usersService: UsersService,
    private _formBuilder: FormBuilder,
    private _materialService: MaterialService) { }

  ngOnInit(): void {
    this.createForm();
    this.getAsignaturaList();
    this.getAlumnoList();
  }

  getAsignaturaList(){
    this._materialService.getAsignaturaList().subscribe(
      (resp) => {
        this.asignaturas = resp;
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
    this.form.reset();
    this.submitted = false;
    this.close.emit(false);
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;

    const fields = this.form.value;

    fields.asignatura = this.asignaturas.find((p) => p.id == fields.asignatura);
    fields.alumno = this.alumnos.find((p) => p.id == fields.alumno);

    if (this.curso.id) {
      this.update(fields);
    } else {
      this.register(fields);
    }
  }

  register(cursoData: ICurso) {

    this._materialService.registerC(cursoData).subscribe(
      (resp) => {
        this.newCurso.emit(resp);
        this.closeModal()
      },
      (err) => {
        console.log(err);
      }
    );
  }

  update(cursoData: ICurso) {

    this._materialService.updateC(cursoData).subscribe(
      (resp) => {
        this.newCurso.emit(resp);
        this.closeModal()
      },
      (err) => {
        console.log(err);
      }
    );
  }

  createForm() {
    this.form = this._formBuilder.group({
      numero: [
        '',
        [
          Validators.required,
          Validators.maxLength(45),
          Validators.minLength(1),
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
      asignatura: ['', [Validators.required]],
      alumno: ['', [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }

  public errorMessages = {
    numero: [
      { type: 'required', message: 'The Code is required' },
      { type: 'maxlength', message: 'Maximum 45 characters' },
      { type: 'minlength', message: 'Minimun 1 characters' },
    ],
    name: [
      { type: 'required', message: 'The name is required' },
      { type: 'maxlength', message: 'Maximum 70 characters' },
      { type: 'minlength', message: 'Minimun 2 characters' },
    ],
    asignatura: [{ type: 'required', message: 'Choose one' }],
    alumno: [{ type: 'required', message: 'Choose one' }],
  };

}
