import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjemplosDeInternetComponent } from './ejemplos-de-internet.component';

describe('EjemplosDeInternetComponent', () => {
  let component: EjemplosDeInternetComponent;
  let fixture: ComponentFixture<EjemplosDeInternetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EjemplosDeInternetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EjemplosDeInternetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
