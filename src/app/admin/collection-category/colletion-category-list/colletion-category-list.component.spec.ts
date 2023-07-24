import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColletionCategoryListComponent } from './colletion-category-list.component';

describe('ColletionCategoryListComponent', () => {
  let component: ColletionCategoryListComponent;
  let fixture: ComponentFixture<ColletionCategoryListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColletionCategoryListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColletionCategoryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
