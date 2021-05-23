import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IEvaluacion } from 'src/app/interfaces/interfaces';
import { DiarioService } from 'src/app/services/diario.service';

@Component({
  selector: 'app-evaluacion-crud',
  templateUrl: './evaluacion-crud.component.html',
  styleUrls: ['./evaluacion-crud.component.css']
})
export class EvaluacionCrudComponent implements OnInit {

  public form: FormGroup;
  public submitted = false;

  @Input() showModal: boolean;
  @Input() evaluacion: IEvaluacion;
  @Input() evaluacions: IEvaluacion[];
  @Output() close: EventEmitter<boolean> = new EventEmitter();
  @Output() newEvaluacion: EventEmitter<IEvaluacion> = new EventEmitter();

  constructor(private _diarioService: DiarioService, private _formBuilder: FormBuilder) { }

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
        this.closeModal()
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
      evaluacionT: ['', [Validators.required]],
      evaluacionP: ['', [Validators.required]],
    });
  }

  get f() {
    return this.form.controls;
  }

  public errorMessages = {
    date: [{ type: 'required', message: 'The Date is required' }],
    evaluacionT: [{ type: 'required', message: 'The Date is required' }],
    evaluacionP: [{ type: 'required', message: 'The Date is required' }],
  };
}
