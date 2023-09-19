import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayShipsComponent } from './display-ships.component';

describe('DisplayShipsComponent', () => {
  let component: DisplayShipsComponent;
  let fixture: ComponentFixture<DisplayShipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayShipsComponent]
    });
    fixture = TestBed.createComponent(DisplayShipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
