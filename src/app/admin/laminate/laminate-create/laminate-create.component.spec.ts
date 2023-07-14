import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaminateCreateComponent } from './laminate-create.component';

describe('LaminateCreateComponent', () => {
  let component: LaminateCreateComponent;
  let fixture: ComponentFixture<LaminateCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaminateCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaminateCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
