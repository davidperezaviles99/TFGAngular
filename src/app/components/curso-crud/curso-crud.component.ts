import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAsignaturas, ICurso } from 'src/app/interfaces/interfaces';
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
  }

   /**
   * Metodo que trae las lista de Cursos
   */
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

  /**
   * Metodo que cierra el Modal y le mete la contraseña automaticamente
   */
  closeModal() {
    this.form.reset();
    this.submitted = false;
    this.close.emit(false);
  }

   /**
   * Metodo que envia el curso completado al metodo de registrar o actualizar
   * @returns Curso Completado
   */
  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;

    const fields = this.form.value;

    fields.asignatura = this.asignaturas.find((p) => p.id == fields.asignatura);

    if (this.curso.id) {
      this.update(fields);
    } else {
      this.register(fields);
    }
  }

  /**
   * Metodo que registra el objeto
   * @param values 
   */
  register(values: any) {

    const cursoData: ICurso = values;

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

  /**
   * Metodo que actualiza el objeto
   * @param values
   */
  update(values: any) {

    const { ...fields } = values;

    const cursoData: ICurso = JSON.parse(JSON.stringify(this.curso));

    Object.assign(cursoData, fields)

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

  /**
   * Metodo que crea el formulario cumpliendo
   * una seria de validaciones estipuladas
   */
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
  };

}
