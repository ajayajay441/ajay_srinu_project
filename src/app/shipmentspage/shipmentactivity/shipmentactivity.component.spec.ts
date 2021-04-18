import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentactivityComponent } from './shipmentactivity.component';

describe('ShipmentactivityComponent', () => {
  let component: ShipmentactivityComponent;
  let fixture: ComponentFixture<ShipmentactivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentactivityComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentactivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
