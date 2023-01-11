import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DatabaseReactComponent } from './database-react.component';

describe('DatabaseReactComponent', () => {
  let component: DatabaseReactComponent;
  let fixture: ComponentFixture<DatabaseReactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DatabaseReactComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DatabaseReactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
