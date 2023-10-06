import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyFleetComponent } from './my-fleet.component';

describe('MyFleetComponent', () => {
  let component: MyFleetComponent;
  let fixture: ComponentFixture<MyFleetComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyFleetComponent]
    });
    fixture = TestBed.createComponent(MyFleetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
