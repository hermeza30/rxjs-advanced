import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultemptyComponent } from './defaultempty.component';

describe('DefaultemptyComponent', () => {
  let component: DefaultemptyComponent;
  let fixture: ComponentFixture<DefaultemptyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultemptyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultemptyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
