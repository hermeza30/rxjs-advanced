import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ColdVsHotObservablesComponent } from './cold-vs-hot-observables.component';

describe('ColdVsHotObservablesComponent', () => {
  let component: ColdVsHotObservablesComponent;
  let fixture: ComponentFixture<ColdVsHotObservablesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ColdVsHotObservablesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ColdVsHotObservablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
