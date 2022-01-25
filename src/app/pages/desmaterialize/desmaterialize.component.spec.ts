import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DesmaterializeComponent } from './desmaterialize.component';

describe('DesmaterializeComponent', () => {
  let component: DesmaterializeComponent;
  let fixture: ComponentFixture<DesmaterializeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DesmaterializeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DesmaterializeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
