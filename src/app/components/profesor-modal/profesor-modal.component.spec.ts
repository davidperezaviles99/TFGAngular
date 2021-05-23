import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfesorModalComponent } from './profesor-modal.component';

describe('ProfesorModalComponent', () => {
  let component: ProfesorModalComponent;
  let fixture: ComponentFixture<ProfesorModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfesorModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfesorModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
