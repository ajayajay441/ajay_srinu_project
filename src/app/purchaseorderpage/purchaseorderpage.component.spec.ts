import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchaseorderpageComponent } from './purchaseorderpage.component';

describe('PurchaseorderpageComponent', () => {
  let component: PurchaseorderpageComponent;
  let fixture: ComponentFixture<PurchaseorderpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PurchaseorderpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PurchaseorderpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
