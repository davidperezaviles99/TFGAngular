import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaluacionCrudComponent } from './evaluacion-crud.component';

describe('EvaluacionCrudComponent', () => {
  let component: EvaluacionCrudComponent;
  let fixture: ComponentFixture<EvaluacionCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaluacionCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EvaluacionCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
