import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindindexComponent } from './findindex.component';

describe('FindindexComponent', () => {
  let component: FindindexComponent;
  let fixture: ComponentFixture<FindindexComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FindindexComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FindindexComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
