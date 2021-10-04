import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchvsmergevsexhaustvsconcatComponent } from './switchvsmergevsexhaustvsconcat.component';

describe('SwitchvsmergevsexhaustvsconcatComponent', () => {
  let component: SwitchvsmergevsexhaustvsconcatComponent;
  let fixture: ComponentFixture<SwitchvsmergevsexhaustvsconcatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SwitchvsmergevsexhaustvsconcatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SwitchvsmergevsexhaustvsconcatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
