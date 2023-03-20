import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CombineObsLikeProComponent } from './combine-obs-like-pro.component';

describe('CombineObsLikeProComponent', () => {
  let component: CombineObsLikeProComponent;
  let fixture: ComponentFixture<CombineObsLikeProComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CombineObsLikeProComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CombineObsLikeProComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
