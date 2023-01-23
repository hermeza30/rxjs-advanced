import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WithLatestFormComponent } from './with-latest-form.component';

describe('WithLatestFormComponent', () => {
  let component: WithLatestFormComponent;
  let fixture: ComponentFixture<WithLatestFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WithLatestFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WithLatestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
