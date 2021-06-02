import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEquipo, IMensaje, IUser } from 'src/app/interfaces/interfaces';
import { Equipo, User } from 'src/app/models/models';
import { EquipoService } from 'src/app/services/equipo.service';
import { MensajeService } from 'src/app/services/mensaje.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-mensaje-crud',
  templateUrl: './mensaje-crud.component.html',
  styleUrls: ['./mensaje-crud.component.css']
})
export class MensajeCrudComponent implements OnInit {
  public form: FormGroup;
  public submitted = false;

  public users: IUser[] = [];
  public equipos: IEquipo[] = [];

  public user = new User();
  public equipo = new Equipo();


  @Input() mensaje: IMensaje;
  @Input() showModal: boolean;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Output() newMensaje: EventEmitter<IMensaje> = new EventEmitter();
  
  constructor(private _mensajeService: MensajeService, 
    private _formBuilder: FormBuilder,
    private _usersService: UsersService,
    private _equipoService: EquipoService
    ) { }

  ngOnInit(): void {
    this.createForm();
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getUser();
    this.getEquipoList();
  }

  getUser(){
    this.user = this._usersService.getUser();
  }

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

  closeModal() {
    this.form.reset();
    this.submitted = false;
    this.close.emit(false);
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;

    const fields = this.form.value;

    fields.equipo = this.equipos.find((e) => e.id == fields.equipo);

    if (this.mensaje.id) {
      this.update(fields);
    } else {
      this.register(fields);
    }
  }

  register(values: any) {

    const mensajeData: IMensaje = values;
    mensajeData.userId = this.user.id;

    this._mensajeService.registerM(mensajeData).subscribe(
      (resp) => {
        this.newMensaje.emit(resp);
        this.closeModal()
      },
      (err) => {
        console.log(err);
      }
    );
  }

  update(values: any) {

    const { ...fields } = values;

    const mensajeData: IMensaje = JSON.parse(JSON.stringify(this.mensaje));

    Object.assign(mensajeData, fields)

    this._mensajeService.updateM(mensajeData).subscribe(
      (resp) => {
        this.newMensaje.emit(resp);
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
            Validators.maxLength(150),
            Validators.minLength(3),
          ],
        ],
      asunto: [
          '',
          [
            Validators.required,
            Validators.maxLength(150),
            Validators.minLength(3),
          ],
        ],
      comentario: [
        '',
        [
          Validators.required,
          Validators.maxLength(150),
          Validators.minLength(3),
        ],
      ],
      equipo: ['', [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }

  public errorMessages = {
    name: [ 
      { type: 'required', message: 'El nombre is required' },
      { type: 'maxlength', message: 'Maximum 150 characters' },
      { type: 'minlength', message: 'Minimun 3 characters' },
    ],
    asunto: [ 
      { type: 'required', message: 'El Asunto is required' },
      { type: 'maxlength', message: 'Maximum 150 characters' },
      { type: 'minlength', message: 'Minimun 3 characters' },
    ],
    comentario: [
      { type: 'required', message: 'The Comment is required' },
      { type: 'maxlength', message: 'Maximum 150 characters' },
      { type: 'minlength', message: 'Minimun 3 characters' },
    ],
    equipo: [{ type: 'required', message: 'Choose one' }],
  };

}
