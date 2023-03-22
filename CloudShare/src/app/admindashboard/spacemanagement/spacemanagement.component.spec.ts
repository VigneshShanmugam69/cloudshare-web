import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpacemanagementComponent } from './spacemanagement.component';

describe('SpacemanagementComponent', () => {
  let component: SpacemanagementComponent;
  let fixture: ComponentFixture<SpacemanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpacemanagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpacemanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
