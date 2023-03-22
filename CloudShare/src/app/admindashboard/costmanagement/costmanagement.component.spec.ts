import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CostmanagementComponent } from './costmanagement.component';

describe('CostmanagementComponent', () => {
  let component: CostmanagementComponent;
  let fixture: ComponentFixture<CostmanagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CostmanagementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CostmanagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
