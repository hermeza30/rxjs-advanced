import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ObservableWithPromiseComponent } from './observable-with-promise.component';

describe('ObservableWithPromiseComponent', () => {
  let component: ObservableWithPromiseComponent;
  let fixture: ComponentFixture<ObservableWithPromiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ObservableWithPromiseComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ObservableWithPromiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
