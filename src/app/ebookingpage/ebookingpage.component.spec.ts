import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EbookingpageComponent } from './ebookingpage.component';

describe('EbookingpageComponent', () => {
  let component: EbookingpageComponent;
  let fixture: ComponentFixture<EbookingpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EbookingpageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EbookingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
