import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CANComponent } from './can.component';

describe('CANComponent', () => {
  let component: CANComponent;
  let fixture: ComponentFixture<CANComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CANComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CANComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
