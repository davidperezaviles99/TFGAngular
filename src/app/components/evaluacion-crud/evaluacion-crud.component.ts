import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEvaluacion, IUser } from 'src/app/interfaces/interfaces';
import { DiarioService } from 'src/app/services/diario.service';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-evaluacion-crud',
  templateUrl: './evaluacion-crud.component.html',
  styleUrls: ['./evaluacion-crud.component.css']
})
export class EvaluacionCrudComponent implements OnInit {
  public form: FormGroup;
  public submitted = false;

  roles = ['Alumno', 'Profesor','Tutor'];

  public user: IUser;

  @Input() showModal: boolean;
  @Input() evaluacion: IEvaluacion;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Output() newEvaluacion: EventEmitter<IEvaluacion> = new EventEmitter();

  constructor(private _diarioService: DiarioService, 
    private _formBuilder: FormBuilder, 
    private _usersService: UsersService) { }

  ngOnInit(): void {
    this.createForm();
    this.getUser();
  }

  getUser(){
    this.user = this._usersService.getUser();
  }
  
  closeEvalModal() {
    this.form.reset();
    this.submitted = false;
    this.close.emit(false);
  }

  onSubmit() {
    this.submitted = true;

    if (this.form.invalid) return;

    const fields = this.form.value;

    if (this.evaluacion.id) {
      this.update(fields);
    } else {
      this.register(fields);
    }
  }

  register(values: any) {

    const evaluacionData: IEvaluacion = values;

    this._diarioService.registerE(evaluacionData).subscribe(
      (resp) => {
        this.newEvaluacion.emit(resp);
        this.closeEvalModal()
      },
      (err) => {
        console.log(err);
      }
    );
  }

  update(values: any) {

    const { ...fields } = values;

    const evaluacionData: IEvaluacion = JSON.parse(JSON.stringify(this.evaluacion));

    Object.assign(evaluacionData, fields)

    this._diarioService.updateE(evaluacionData).subscribe(
      (resp) => {
        this.newEvaluacion.emit(resp);
        this.closeEvalModal()
      },
      (err) => {
        console.log(err);
      }
    );
  }

  createForm() {
    this.form = this._formBuilder.group({
      date: [''],
      evaluacionT: [''],
      evaluacionP: [''],
    });
  }

  get f() {
    return this.form.controls;
  }

  public errorMessages = {
    
  };
}
