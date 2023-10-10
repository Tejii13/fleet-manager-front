import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MemberHangarDisplayComponent } from './member-hangar-display.component';

describe('MemberHangarDisplayComponent', () => {
  let component: MemberHangarDisplayComponent;
  let fixture: ComponentFixture<MemberHangarDisplayComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MemberHangarDisplayComponent]
    });
    fixture = TestBed.createComponent(MemberHangarDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
