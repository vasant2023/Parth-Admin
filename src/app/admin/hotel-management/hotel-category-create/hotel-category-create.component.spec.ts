import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelCategoryCreateComponent } from './hotel-category-create.component';

describe('HotelCategoryCreateComponent', () => {
  let component: HotelCategoryCreateComponent;
  let fixture: ComponentFixture<HotelCategoryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelCategoryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelCategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
