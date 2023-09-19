import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchShipsComponent } from './search-ships.component';

describe('SearchShipsComponent', () => {
  let component: SearchShipsComponent;
  let fixture: ComponentFixture<SearchShipsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchShipsComponent]
    });
    fixture = TestBed.createComponent(SearchShipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
