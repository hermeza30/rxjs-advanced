import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BehiviorSubjectComponent } from './behivior-subject.component';

describe('BehiviorSubjectComponent', () => {
  let component: BehiviorSubjectComponent;
  let fixture: ComponentFixture<BehiviorSubjectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BehiviorSubjectComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BehiviorSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
