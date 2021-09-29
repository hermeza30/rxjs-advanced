import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergesComponentsComponent } from './merges-components.component';

describe('MergesComponentsComponent', () => {
  let component: MergesComponentsComponent;
  let fixture: ComponentFixture<MergesComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MergesComponentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MergesComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
