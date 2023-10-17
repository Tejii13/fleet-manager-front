import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipAddPopupComponent } from './ship-add-popup.component';

describe('ShipAddPopupComponent', () => {
  let component: ShipAddPopupComponent;
  let fixture: ComponentFixture<ShipAddPopupComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ShipAddPopupComponent]
    });
    fixture = TestBed.createComponent(ShipAddPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
