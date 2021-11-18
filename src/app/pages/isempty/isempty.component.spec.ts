import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IsemptyComponent } from './isempty.component';

describe('IsemptyComponent', () => {
  let component: IsemptyComponent;
  let fixture: ComponentFixture<IsemptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IsemptyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IsemptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
