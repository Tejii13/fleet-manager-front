import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubNavbarBurgerComponent } from './sub-navbar-burger.component';

describe('SubNavbarBurgerComponent', () => {
  let component: SubNavbarBurgerComponent;
  let fixture: ComponentFixture<SubNavbarBurgerComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SubNavbarBurgerComponent]
    });
    fixture = TestBed.createComponent(SubNavbarBurgerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
