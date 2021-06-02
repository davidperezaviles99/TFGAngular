import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileCrudComponent } from './profile-crud.component';

describe('ProfileCrudComponent', () => {
  let component: ProfileCrudComponent;
  let fixture: ComponentFixture<ProfileCrudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileCrudComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileCrudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
