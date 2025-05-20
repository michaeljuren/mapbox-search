import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapboxSearchComponent } from './mapbox-search.component';

describe('MapboxSearchComponent', () => {
  let component: MapboxSearchComponent;
  let fixture: ComponentFixture<MapboxSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MapboxSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MapboxSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


});


