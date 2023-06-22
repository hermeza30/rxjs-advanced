import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchMapVsMergeMapComponent } from './switch-map-vs-merge-map.component';

describe('SwitchMapVsMergeMapComponent', () => {
  let component: SwitchMapVsMergeMapComponent;
  let fixture: ComponentFixture<SwitchMapVsMergeMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchMapVsMergeMapComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchMapVsMergeMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
