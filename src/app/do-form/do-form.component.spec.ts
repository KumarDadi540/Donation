import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DoFormComponent } from './do-form.component';

describe('DoFormComponent', () => {
  let component: DoFormComponent;
  let fixture: ComponentFixture<DoFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DoFormComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DoFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
