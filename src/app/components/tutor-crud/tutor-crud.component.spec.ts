import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorCrudComponent } from './tutor-crud.component';

describe('TutorCrudComponent', () => {
  let component: TutorCrudComponent;
  let fixture: ComponentFixture<TutorCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TutorCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
