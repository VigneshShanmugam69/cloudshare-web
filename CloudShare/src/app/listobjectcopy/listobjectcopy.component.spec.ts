import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListobjectcopyComponent } from './listobjectcopy.component';

describe('ListobjectcopyComponent', () => {
  let component: ListobjectcopyComponent;
  let fixture: ComponentFixture<ListobjectcopyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListobjectcopyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListobjectcopyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
