import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodolistcardComponent } from './todolistcard.component';

describe('TodolistcardComponent', () => {
  let component: TodolistcardComponent;
  let fixture: ComponentFixture<TodolistcardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodolistcardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TodolistcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
