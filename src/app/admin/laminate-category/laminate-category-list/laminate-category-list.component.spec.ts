import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaminateCategoryListComponent } from './laminate-category-list.component';

describe('LaminateCategoryListComponent', () => {
  let component: LaminateCategoryListComponent;
  let fixture: ComponentFixture<LaminateCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaminateCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaminateCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
