import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObjectpopupComponent } from './objectpopup.component';

describe('ObjectpopupComponent', () => {
  let component: ObjectpopupComponent;
  let fixture: ComponentFixture<ObjectpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObjectpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ObjectpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
