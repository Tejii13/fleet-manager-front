import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipSynthesisComponent } from './ship-synthesis.component';

describe('ShipSynthesisComponent', () => {
  let component: ShipSynthesisComponent;
  let fixture: ComponentFixture<ShipSynthesisComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShipSynthesisComponent]
    });
    fixture = TestBed.createComponent(ShipSynthesisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
