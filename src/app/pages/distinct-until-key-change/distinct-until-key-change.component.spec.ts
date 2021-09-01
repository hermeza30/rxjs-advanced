import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistinctUntilKeyChangeComponent } from './distinct-until-key-change.component';

describe('DistinctUntilKeyChangeComponent', () => {
  let component: DistinctUntilKeyChangeComponent;
  let fixture: ComponentFixture<DistinctUntilKeyChangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistinctUntilKeyChangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistinctUntilKeyChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
