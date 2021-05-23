import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiarioCrudComponent } from './diario-crud.component';

describe('DiarioCrudComponent', () => {
  let component: DiarioCrudComponent;
  let fixture: ComponentFixture<DiarioCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DiarioCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DiarioCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
