import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColletionCategoryCreateComponent } from './colletion-category-create.component';

describe('ColletionCategoryCreateComponent', () => {
  let component: ColletionCategoryCreateComponent;
  let fixture: ComponentFixture<ColletionCategoryCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ColletionCategoryCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColletionCategoryCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
