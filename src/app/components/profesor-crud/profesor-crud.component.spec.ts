import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorCrudComponent } from './profesor-crud.component';

describe('ProfesorCrudComponent', () => {
  let component: ProfesorCrudComponent;
  let fixture: ComponentFixture<ProfesorCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesorCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesorCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
