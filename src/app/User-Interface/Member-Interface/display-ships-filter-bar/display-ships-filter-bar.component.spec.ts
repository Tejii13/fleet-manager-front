import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisplayShipsFilterBarComponent } from './display-ships-filter-bar.component';

describe('DisplayShipsFilterBarComponent', () => {
  let component: DisplayShipsFilterBarComponent;
  let fixture: ComponentFixture<DisplayShipsFilterBarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DisplayShipsFilterBarComponent]
    });
    fixture = TestBed.createComponent(DisplayShipsFilterBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
