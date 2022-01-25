import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObserveronComponent } from './observeron.component';

describe('ObserveronComponent', () => {
  let component: ObserveronComponent;
  let fixture: ComponentFixture<ObserveronComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObserveronComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObserveronComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
