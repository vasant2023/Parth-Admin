import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemCategoryListComponent } from './item-category-list.component';

describe('ItemCategoryListComponent', () => {
  let component: ItemCategoryListComponent;
  let fixture: ComponentFixture<ItemCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
