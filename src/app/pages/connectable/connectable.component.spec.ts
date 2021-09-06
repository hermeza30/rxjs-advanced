import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConnectableComponent } from './connectable.component';

describe('ConnectableComponent', () => {
  let component: ConnectableComponent;
  let fixture: ComponentFixture<ConnectableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConnectableComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ConnectableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
