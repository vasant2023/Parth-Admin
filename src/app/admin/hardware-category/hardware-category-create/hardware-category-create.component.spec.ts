import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HardwareCategoryCreateComponent } from './hardware-category-create.component';

describe('HardwareCategoryCreateComponent', () => {
  let component: HardwareCategoryCreateComponent;
  let fixture: ComponentFixture<HardwareCategoryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HardwareCategoryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HardwareCategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
