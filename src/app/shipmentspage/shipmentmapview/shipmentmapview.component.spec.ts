import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentmapviewComponent } from './shipmentmapview.component';

describe('ShipmentmapviewComponent', () => {
  let component: ShipmentmapviewComponent;
  let fixture: ComponentFixture<ShipmentmapviewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentmapviewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentmapviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
