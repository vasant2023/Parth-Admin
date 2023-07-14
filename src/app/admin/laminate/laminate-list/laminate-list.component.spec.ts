import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaminateListComponent } from './laminate-list.component';

describe('LaminateListComponent', () => {
  let component: LaminateListComponent;
  let fixture: ComponentFixture<LaminateListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaminateListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaminateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
