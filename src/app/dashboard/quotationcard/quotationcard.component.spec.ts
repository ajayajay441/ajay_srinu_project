import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuotationcardComponent } from './quotationcard.component';

describe('QuotationcardComponent', () => {
  let component: QuotationcardComponent;
  let fixture: ComponentFixture<QuotationcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuotationcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuotationcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
