import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UseraccessmanagementComponent } from './useraccessmanagement.component';

describe('UseraccessmanagementComponent', () => {
  let component: UseraccessmanagementComponent;
  let fixture: ComponentFixture<UseraccessmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UseraccessmanagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UseraccessmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
