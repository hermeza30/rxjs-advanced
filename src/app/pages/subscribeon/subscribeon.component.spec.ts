import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubscribeonComponent } from './subscribeon.component';

describe('SubscribeonComponent', () => {
  let component: SubscribeonComponent;
  let fixture: ComponentFixture<SubscribeonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubscribeonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubscribeonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
