import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaminateCategoryCreateComponent } from './laminate-category-create.component';

describe('LaminateCategoryCreateComponent', () => {
  let component: LaminateCategoryCreateComponent;
  let fixture: ComponentFixture<LaminateCategoryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaminateCategoryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaminateCategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
