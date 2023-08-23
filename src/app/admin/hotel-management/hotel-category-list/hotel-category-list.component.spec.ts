import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelCategoryListComponent } from './hotel-category-list.component';

describe('HotelCategoryListComponent', () => {
  let component: HotelCategoryListComponent;
  let fixture: ComponentFixture<HotelCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
