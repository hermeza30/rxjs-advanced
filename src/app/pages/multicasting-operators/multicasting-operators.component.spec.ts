import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MulticastingOperatorsComponent } from './multicasting-operators.component';

describe('MulticastingOperatorsComponent', () => {
  let component: MulticastingOperatorsComponent;
  let fixture: ComponentFixture<MulticastingOperatorsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MulticastingOperatorsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MulticastingOperatorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
