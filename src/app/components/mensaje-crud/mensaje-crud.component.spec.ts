import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MensajeCrudComponent } from './mensaje-crud.component';

describe('MensajeCrudComponent', () => {
  let component: MensajeCrudComponent;
  let fixture: ComponentFixture<MensajeCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MensajeCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MensajeCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
