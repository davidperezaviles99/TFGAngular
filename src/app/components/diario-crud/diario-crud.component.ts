import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAsignaturas, IDiario, IEquipo, IUser } from 'src/app/interfaces/interfaces';
import { Asignaturas, Equipo, User } from 'src/app/models/models';
import { DiarioService } from 'src/app/services/diario.service';
import { EquipoService } from 'src/app/services/equipo.service';
import { MaterialService } from 'src/app/services/material.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-diario-crud',
  templateUrl: './diario-crud.component.html',
  styleUrls: ['./diario-crud.component.css']
})
export class DiarioCrudComponent implements OnInit {
  public form: FormGroup;
  public submitted = false;

  public asignaturas: IAsignaturas[] = [];
  public users: IUser[] = [];
  public equipos: IEquipo[] = [];

  roles = ['Alumno', 'Profesor','Tutor']

  public user = new User();
  public asignatura = new Asignaturas();
  public equipo = new Equipo();

  @Input() diario: IDiario;
  @Input() showModal: boolean;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Output() newDiario: EventEmitter<IDiario> = new EventEmitter();

  constructor(private _diarioService: DiarioService, 
    private _formBuilder: FormBuilder, 
    private _materialService: MaterialService,
    private _usersService: UsersService,
    private _equipoService: EquipoService) { }

  ngOnInit(): void {
    this.createForm();
    this.getAsignaturaList();
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getUser();
    // this.equipo = JSON.parse(localStorage.getItem('equipo'));
    // this.getEquipo();
    this.getEquipoList();
  }

  // getEquipo(){
  //   this.equipo = this._equipoService.getEquipo();
  // }

  /**
   * Metodo que obtiene el usuario
   */
  getUser(){
    this.user = this._usersService.getUser();
  }

  /**
   * Metodo que trae las lista de Equipos
   */
  getEquipoList(){
    this._equipoService.getEquipoList().subscribe(
      (resp) => {
        this.equipos = resp;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  /**
   * Metodo que trae las lista de Asignaturas
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
   * Metodo que envia el diario completado al metodo de registrar o actualizar
   * @returns Diario Completado
   */
  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;

    const fields = this.form.value;

    fields.asignatura = this.asignaturas.find((a) => a.id == fields.asignatura);

    fields.equipo = this.equipos.find((e) => e.id == fields.equipo);

    if (this.diario.id) {
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

    const diarioData: IDiario =  values;
    diarioData.userId = this.user.id;

    this._diarioService.registerD(diarioData).subscribe(
      (resp) => {
        this.newDiario.emit(resp);
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

    const diarioData: IDiario = JSON.parse(JSON.stringify(this.diario));

    Object.assign(diarioData, fields)

    this._diarioService.updateD(diarioData).subscribe(
      (resp) => {
        this.newDiario.emit(resp);
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
      date: ['',[Validators.required,],],
      horas: [
        '',
        [
          Validators.maxLength(2),
          Validators.minLength(1),
        ],
      ],
      descripcion: [
        '',
        [
          Validators.maxLength(150),
          Validators.minLength(3),
        ],
      ],
      link: [
        '',
        [
          Validators.maxLength(150),
          Validators.minLength(3),
        ],
      ],
      evaluacionT: ['', 
      [
        Validators.pattern('^[a-zA-Z]+$'), 
        Validators.maxLength(1), 
        Validators.minLength(1),
      ],
      ],
      evaluacionP: ['', 
      [
        Validators.pattern('^[a-zA-Z]+$'), 
        Validators.maxLength(1), 
        Validators.minLength(1),
      ],
      ],
      asignatura: [''],
      equipo: [''],
    });
  }

  get f() {
    return this.form.controls;
  }

  public errorMessages = {
    date: [{ type: 'required', message: 'The Date is required' }],
    horas: [
      { type: 'maxlength', message: 'Maximum 2 characters' },
      { type: 'minlength', message: 'Minimun 1 characters' },
    ],
    descripcion: [
      { type: 'maxlength', message: 'Maximum 150 characters' },
      { type: 'minlength', message: 'Minimun 3 characters' },
    ],
    link: [
      { type: 'maxlength', message: 'Maximum 150 characters' },
      { type: 'minlength', message: 'Minimun 3 characters' },
    ],
    evaluacionT: [
      { type: 'pattern', message: 'Evaluacion must contain 1 letter'},
      { type: 'maxlength', message: 'Maximum 1 characters' },
      { type: 'minlength', message: 'Minimun 1 characters' },
    ],
    evaluacionP: [
      { type: 'pattern', message: 'Evaluacion must contain 1 letter'},
      { type: 'maxlength', message: 'Maximum 1 characters' },
      { type: 'minlength', message: 'Minimun 1 characters' },
    ],
    asignatura: [{ type: 'required', message: 'Choose one' }],
    equipo: [{ type: 'required', message: 'Choose one' }],
  };

}
