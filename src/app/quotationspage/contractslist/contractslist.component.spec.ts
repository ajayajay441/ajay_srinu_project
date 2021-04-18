import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractslistComponent } from './contractslist.component';

describe('ContractslistComponent', () => {
  let component: ContractslistComponent;
  let fixture: ComponentFixture<ContractslistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractslistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContractslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
