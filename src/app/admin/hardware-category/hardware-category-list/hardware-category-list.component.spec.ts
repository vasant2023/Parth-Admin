import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareCategoryListComponent } from './hardware-category-list.component';

describe('HardwareCategoryListComponent', () => {
  let component: HardwareCategoryListComponent;
  let fixture: ComponentFixture<HardwareCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HardwareCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwareCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
