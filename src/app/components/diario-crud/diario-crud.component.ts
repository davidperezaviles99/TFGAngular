import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IAsignaturas, IDiario } from 'src/app/interfaces/interfaces';
import { DiarioService } from 'src/app/services/diario.service';
import { MaterialService } from 'src/app/services/material.service';

@Component({
  selector: 'app-diario-crud',
  templateUrl: './diario-crud.component.html',
  styleUrls: ['./diario-crud.component.css']
})
export class DiarioCrudComponent implements OnInit {
  public form: FormGroup;
  public submitted = false;

  public asignaturas: IAsignaturas[] = [];

  @Input() diario: IDiario;
  @Input() showModal: boolean;
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Output() newDiario: EventEmitter<IDiario> = new EventEmitter();

  constructor(private _diarioService: DiarioService, private _formBuilder: FormBuilder, private _materialService: MaterialService) { }

  ngOnInit(): void {
    this.createForm();
    this.getAsignaturaList();
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

    if (this.diario.id) {
      this.update(fields);
    } else {
      this.register(fields);
    }
  }

  register(values: any) {

    const diarioData: IDiario = values;

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

  createForm() {
    this.form = this._formBuilder.group({
      date: ['',[Validators.required,],],
      horas: [
        '',
        [
          Validators.required,
          Validators.maxLength(2),
          Validators.minLength(1),
        ],
      ],
      descripcion: [
        '',
        [
          Validators.required,
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
      asignatura: ['', [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }

  public errorMessages = {
    date: [{ type: 'required', message: 'The Date is required' }],
    horas: [
      { type: 'required', message: 'The hours is required' },
      { type: 'maxlength', message: 'Maximum 2 characters' },
      { type: 'minlength', message: 'Minimun 1 characters' },
    ],
    descripcion: [
      { type: 'required', message: 'The description is required' },
      { type: 'maxlength', message: 'Maximum 150 characters' },
      { type: 'minlength', message: 'Minimun 3 characters' },
    ],
    link: [
      { type: 'maxlength', message: 'Maximum 150 characters' },
      { type: 'minlength', message: 'Minimun 3 characters' },
    ],
    asignatura: [{ type: 'required', message: 'Choose one' }],
  };

}
