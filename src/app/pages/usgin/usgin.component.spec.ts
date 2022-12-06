import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsginComponent } from './usgin.component';

describe('UsginComponent', () => {
  let component: UsginComponent;
  let fixture: ComponentFixture<UsginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UsginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UsginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
