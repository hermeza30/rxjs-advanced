import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WhatsNewsComponent } from './whats-news.component';

describe('WhatsNewsComponent', () => {
  let component: WhatsNewsComponent;
  let fixture: ComponentFixture<WhatsNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WhatsNewsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WhatsNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
