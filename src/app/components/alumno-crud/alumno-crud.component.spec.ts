import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlumnoCrudComponent } from './alumno-crud.component';

describe('AlumnoCrudComponent', () => {
  let component: AlumnoCrudComponent;
  let fixture: ComponentFixture<AlumnoCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AlumnoCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AlumnoCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
