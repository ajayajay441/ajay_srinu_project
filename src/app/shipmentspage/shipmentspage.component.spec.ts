import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShipmentspageComponent } from './shipmentspage.component';

describe('ShipmentspageComponent', () => {
  let component: ShipmentspageComponent;
  let fixture: ComponentFixture<ShipmentspageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShipmentspageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipmentspageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
