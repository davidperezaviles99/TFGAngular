import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignaturaCrudComponent } from './asignatura-crud.component';

describe('AsignaturaCrudComponent', () => {
  let component: AsignaturaCrudComponent;
  let fixture: ComponentFixture<AsignaturaCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignaturaCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AsignaturaCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
